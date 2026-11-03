import { createHmac, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { ensureReady } from "./ensure";
import { query } from "./db";
import { orders } from "./schema";

const TOLERANCE_SECONDS = 300;

export function verifyPeerPaySignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
) {
  if (!signature || !timestamp || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > TOLERANCE_SECONDS) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

type PeerOrder = {
  id: string;
  status?: string;
  notes?: unknown;
  requestedUsdcAmount?: string | null;
};

export type PeerPayEvent = {
  id?: string;
  type: string;
  data?: {
    order?: PeerOrder | null;
    payment?: { id?: string; status?: string } | null;
    resize?: { newAmountUsdc?: string } | null;
    test?: boolean;
  };
};

/** Returns false if this webhook id was already processed. */
export async function claimWebhook(id: string, type: string) {
  await ensureReady();
  const res = await query(
    "insert into webhook_events (id, provider, type) values ($1, 'peerpay', $2) on conflict (id) do nothing returning id",
    [id, type],
  );
  return res.length > 0;
}

async function findOrderId(order: PeerOrder) {
  const notes = (order.notes ?? {}) as { merchantOrderId?: string };
  if (typeof notes.merchantOrderId === "string") return notes.merchantOrderId;
  const db = getDb();
  const rows = await db.select({ id: orders.id }).from(orders).where(eq(orders.paymentRef, order.id)).limit(1);
  return rows[0]?.id ?? null;
}

export async function applyPeerPayEvent(event: PeerPayEvent) {
  const order = event.data?.order;
  if (!order?.id) return "ignored";
  await ensureReady();
  const orderId = await findOrderId(order);
  if (!orderId) return "unknown-order";
  const db = getDb();
  const [current] = await db
    .select({ paymentStatus: orders.paymentStatus, paymentRef: orders.paymentRef })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  if (!current || (current.paymentRef && current.paymentRef !== order.id)) return "ref-mismatch";

  const now = new Date();
  const fulfilled = event.type === "ORDER_FULFILLED" || order.status === "FULFILLED";
  if (fulfilled) {
    await db
      .update(orders)
      .set({ paymentStatus: "paid", status: "confirmed", paymentAmountUsdc: order.requestedUsdcAmount ?? null, updatedAt: now })
      .where(eq(orders.id, orderId));
    return "paid";
  }
  // Never downgrade a paid order on a late/out-of-order event.
  if (current.paymentStatus === "paid") return "already-paid";

  switch (event.type) {
    case "ORDER_CANCELLED":
      await db.update(orders).set({ paymentStatus: "failed", status: "cancelled", updatedAt: now }).where(eq(orders.id, orderId));
      return "cancelled";
    case "PAYMENT_FAILED":
      await db.update(orders).set({ paymentStatus: "failed", updatedAt: now }).where(eq(orders.id, orderId));
      return "failed";
    case "PAYMENT_EXPIRED":
      // Order stays open; the customer can retry and a late settlement can still land.
      await db.update(orders).set({ paymentStatus: "unpaid", updatedAt: now }).where(eq(orders.id, orderId));
      return "expired";
    case "PAYMENT_SETTLED":
      if (order.status === "PARTIALLY_FULFILLED") {
        await db.update(orders).set({ paymentStatus: "partial", updatedAt: now }).where(eq(orders.id, orderId));
        return "partial";
      }
      return "settled";
    case "ORDER_RESIZED": {
      const amount = event.data?.resize?.newAmountUsdc ?? order.requestedUsdcAmount ?? null;
      await db.update(orders).set({ paymentAmountUsdc: amount, updatedAt: now }).where(eq(orders.id, orderId));
      return "resized";
    }
    default:
      return "ignored";
  }
}
