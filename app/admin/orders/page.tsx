import { formatMoney } from "@/lib/money";
import { ORDER_STATUSES, listOrders } from "@/lib/orders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string }>;
}) {
  const params = await searchParams;
  const rows = await listOrders(params);
  return (
    <>
      <h1>Orders</h1>
      <p className="lead">Search, filter, and open any order placed on the site.</p>
      <form className="filters" method="get">
        <input name="q" placeholder="Search number or email" defaultValue={params.q} />
        <select name="status" defaultValue={params.status ?? ""}>
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input type="date" name="from" defaultValue={params.from} />
        <input type="date" name="to" defaultValue={params.to} />
        <button className="btn" type="submit">
          Filter
        </button>
      </form>
      <table className="plain">
        <tbody>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Total</th>
          </tr>
          {rows.map((o) => (
            <tr key={o.id}>
              <td>
                <a href={`/admin/orders/${o.id}`}>{o.number}</a>
              </td>
              <td>{o.createdAt.toLocaleDateString()}</td>
              <td>{o.email}</td>
              <td>
                <span className="pill">{o.status}</span>
              </td>
              <td>{o.paymentStatus}</td>
              <td>{formatMoney(o.totalCents)}</td>
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td colSpan={6}>No matching orders.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}
