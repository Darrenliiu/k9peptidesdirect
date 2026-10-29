import { formatMoney } from "@/lib/money";
import { ORDER_STATUSES, countOrdersByStatus, listOrders, paymentLabel, statusLabel } from "@/lib/orders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string }>;
}) {
  const params = await searchParams;
  const [rows, requestedCount] = await Promise.all([
    listOrders(params),
    countOrdersByStatus("requested"),
  ]);
  return (
    <>
      <h1>Orders</h1>
      <p className="lead">Requested orders sit at the top until the team follows up.</p>
      <div className="filters">
        <a
          className={params.status === "requested" ? "btn" : "btn ghost"}
          href="/admin/orders?status=requested"
        >
          Requested · {requestedCount}
        </a>
        <a className={!params.status ? "btn ghost" : "btn ghost"} href="/admin/orders">
          All orders
        </a>
      </div>
      <form className="filters" method="get">
        <input name="q" placeholder="Search number or email" defaultValue={params.q} />
        <select name="status" defaultValue={params.status ?? ""}>
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
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
            <th>Request</th>
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
                <span className={`pill ${o.status}`}>{statusLabel(o.status)}</span>
              </td>
              <td>{paymentLabel(o.paymentStatus)}</td>
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
