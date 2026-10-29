import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { listOrders } from "@/lib/orders";
import { user } from "@/lib/schema";

export default async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (!row) notFound();
  const orders = await listOrders({ userId: id });
  return (
    <>
      <h1>{row.name || row.email}</h1>
      <p className="lead">
        {row.email} · {row.role} · joined {row.createdAt.toLocaleDateString()}
      </p>
      <table className="plain">
        <tbody>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <a href={`/admin/orders/${o.id}`}>{o.number}</a>
              </td>
              <td>{o.createdAt.toLocaleDateString()}</td>
              <td>{o.status}</td>
              <td>{formatMoney(o.totalCents)}</td>
            </tr>
          ))}
          {!orders.length ? (
            <tr>
              <td colSpan={4}>No orders for this customer.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}
