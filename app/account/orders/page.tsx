import { formatMoney } from "@/lib/money";
import { listOrders } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const metadata = { title: "Order history" };

export default async function AccountOrders() {
  const session = await getSession();
  const mine = session ? await listOrders({ userId: session.user.id }) : [];
  const guests = session ? await listOrders({ email: session.user.email }) : [];
  const seen = new Set(mine.map((o) => o.id));
  const rows = [...mine, ...guests.filter((o) => !seen.has(o.id))];
  return (
    <>
      <h1>Order history</h1>
      <div className="tw">
        <table>
          <tbody>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
            {rows.map((o) => (
              <tr key={o.id}>
                <td>
                  <a href={`/account/orders/${o.id}`}>{o.number}</a>
                </td>
                <td>{o.createdAt.toLocaleDateString()}</td>
                <td>{o.status}</td>
                <td>{formatMoney(o.totalCents)}</td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={4}>No orders yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
