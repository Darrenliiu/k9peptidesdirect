import { and, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import { getDb, query } from "./db";
import { ensureReady } from "./ensure";
import { orderItems, orderNotes, orders, type Order, type OrderItem, type OrderNote } from "./schema";

export const WORKFLOW_STATUSES = [
  "requested",
  "contacted",
  "confirmed",
  "shipped",
  "cancelled",
] as const;

/** Includes legacy stub statuses so older rows remain filterable. */
export const ORDER_STATUSES = [
  ...WORKFLOW_STATUSES,
  "pending",
  "processing",
  "delivered",
  "refunded",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type FullOrder = Order & { items: OrderItem[]; notes: OrderNote[] };

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    requested: "Requested",
    contacted: "Contacted",
    confirmed: "Confirmed / paid",
    shipped: "Shipped",
    cancelled: "Cancelled",
    pending: "Pending",
    processing: "Processing",
    delivered: "Delivered",
    refunded: "Refunded",
  };
  return labels[status] ?? status;
}

export function paymentLabel(status: string) {
  if (status === "unpaid") return "No payment yet";
  if (status === "paid") return "Paid";
  if (status === "failed") return "Failed";
  return status;
}

export async function listOrders(opts: {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
  userId?: string;
  email?: string;
}) {
  await ensureReady();
  const db = getDb();
  const filters = [];
  if (opts.status) filters.push(eq(orders.status, opts.status));
  if (opts.userId) filters.push(eq(orders.userId, opts.userId));
  if (opts.email) filters.push(eq(orders.email, opts.email.toLowerCase()));
  if (opts.from) filters.push(gte(orders.createdAt, new Date(opts.from)));
  if (opts.to) filters.push(lte(orders.createdAt, new Date(`${opts.to}T23:59:59`)));
  if (opts.q) {
    filters.push(
      or(ilike(orders.number, `%${opts.q}%`), ilike(orders.email, `%${opts.q}%`))!,
    );
  }
  return db
    .select()
    .from(orders)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(sql`case when ${orders.status} = 'requested' then 0 else 1 end`, desc(orders.createdAt));
}

export async function countOrdersByStatus(status: string) {
  await ensureReady();
  const [row] = await query<{ n: number }>(
    "select count(*)::int as n from orders where status = $1",
    [status],
  );
  return row?.n ?? 0;
}

export async function getOrder(id: string): Promise<FullOrder | null> {
  await ensureReady();
  const db = getDb();
  const [row] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!row) return null;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  const notes = await db.select().from(orderNotes).where(eq(orderNotes.orderId, id));
  return { ...row, items, notes };
}

export async function getOrderByNumber(number: string, email?: string) {
  await ensureReady();
  const db = getDb();
  const [row] = await db.select().from(orders).where(eq(orders.number, number)).limit(1);
  if (!row) return null;
  if (email && row.email.toLowerCase() !== email.toLowerCase() && row.userId == null) return null;
  return getOrder(row.id);
}

export async function dashboardStats() {
  await ensureReady();
  const [sales] = await query<{
    revenue: number;
    orders_30: number;
    open_orders: number;
    requested: number;
  }>(`
    select
      coalesce(sum(total_cents) filter (where payment_status = 'paid' and status not in ('cancelled','refunded')), 0)::int as revenue,
      count(*) filter (where created_at >= now() - interval '30 days')::int as orders_30,
      count(*) filter (where status in ('requested','contacted','pending','processing'))::int as open_orders,
      count(*) filter (where status = 'requested')::int as requested
    from orders
  `);
  return sales ?? { revenue: 0, orders_30: 0, open_orders: 0, requested: 0 };
}
