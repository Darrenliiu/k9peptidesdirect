import { getDb } from "@/lib/db";
import { ensureReady } from "@/lib/ensure";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/** Minimal public status for the success page poller. Exposes only payment state. */
export async function GET(request: Request) {
  const number = new URL(request.url).searchParams.get("order");
  if (!number) return Response.json({ error: "Missing order" }, { status: 400 });
  await ensureReady();
  const [row] = await getDb()
    .select({ paymentStatus: orders.paymentStatus, provider: orders.paymentProvider, status: orders.status })
    .from(orders)
    .where(eq(orders.number, number))
    .limit(1);
  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(row, { headers: { "Cache-Control": "no-store" } });
}
