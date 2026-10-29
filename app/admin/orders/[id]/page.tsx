import { notFound } from "next/navigation";
import { updateOrderAction } from "@/app/actions/admin";
import { trackingUrl } from "@/lib/email";
import { formatMoney } from "@/lib/money";
import { WORKFLOW_STATUSES, getOrder, paymentLabel, statusLabel } from "@/lib/orders";

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();
  const ship = order.shippingAddress as Record<string, string>;
  const track = trackingUrl(order.trackingCarrier, order.trackingNumber);
  const statuses = WORKFLOW_STATUSES.includes(order.status as (typeof WORKFLOW_STATUSES)[number])
    ? WORKFLOW_STATUSES
    : ([order.status, ...WORKFLOW_STATUSES] as const);

  return (
    <>
      <h1>{order.number}</h1>
      <p className="lead">
        <span className={`pill ${order.status}`}>{statusLabel(order.status)}</span> ·{" "}
        {paymentLabel(order.paymentStatus)} · {order.createdAt.toLocaleString()}
      </p>
      <div className="grid2">
        <div className="panel">
          <h3>Line items</h3>
          <table className="plain">
            <tbody>
              {order.items.map((i) => (
                <tr key={i.id}>
                  <td>
                    {i.name}
                    {i.variantName ? ` · ${i.variantName}` : ""}
                  </td>
                  <td>×{i.quantity}</td>
                  <td>{formatMoney(i.unitPriceCents)} each</td>
                  <td>{formatMoney(i.unitPriceCents * i.quantity)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>Subtotal</td>
                <td>{formatMoney(order.subtotalCents)}</td>
              </tr>
              <tr>
                <td colSpan={3}>Shipping estimate · {order.shippingMethod}</td>
                <td>{formatMoney(order.shippingCents)}</td>
              </tr>
              <tr>
                <td colSpan={3}>Tax</td>
                <td>{formatMoney(order.taxCents)}</td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <b>Estimated total</b>
                </td>
                <td>
                  <b>{formatMoney(order.totalCents)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="stack">
          <div className="panel">
            <h3>Customer & shipping</h3>
            <p>
              {ship.firstName} {ship.lastName}
              <br />
              {order.email}
              <br />
              {ship.phone || "No phone"}
              <br />
              Preferred contact: {order.contactMethod ?? "email"}
            </p>
            <p>
              {ship.line1} {ship.line2}
              <br />
              {ship.city}, {ship.state} {ship.postalCode}
              <br />
              {ship.country}
            </p>
            <p>
              Dog: {order.dogName || "—"}
              {order.dogWeight ? ` · ${order.dogWeight}` : ""}
            </p>
            {order.customerNote ? <p>Customer note: {order.customerNote}</p> : null}
            <p>
              Payment provider: {order.paymentProvider ?? "request"} · {order.paymentRef ?? "unpaid"}
            </p>
            {order.userId ? <p>Attached account: {order.userId}</p> : <p>Guest request</p>}
          </div>
          <form className="panel stack" action={updateOrderAction}>
            <h3>Follow-up</h3>
            <input type="hidden" name="id" value={order.id} />
            <label>
              Status
              <select name="status" defaultValue={order.status}>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {statusLabel(s)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Carrier
              <input name="trackingCarrier" defaultValue={order.trackingCarrier ?? ""} placeholder="UPS / USPS / FedEx" />
            </label>
            <label>
              Tracking number
              <input name="trackingNumber" defaultValue={order.trackingNumber ?? ""} />
            </label>
            {track ? (
              <p>
                <a href={track} target="_blank" rel="noreferrer">
                  Open tracking
                </a>
              </p>
            ) : null}
            <label>
              Internal note
              <textarea name="note" rows={3} placeholder="Add an internal note" />
            </label>
            <label>
              <input type="checkbox" name="visible" /> Visible to customer
            </label>
            <button className="btn" type="submit">
              Save order
            </button>
          </form>
        </div>
      </div>
      <div className="panel" style={{ marginTop: 16 }}>
        <h3>Notes</h3>
        {order.notes.map((n) => (
          <p key={n.id}>
            <b>{n.authorName}</b> · {n.createdAt.toLocaleString()}
            {n.isCustomerVisible ? " · customer-visible" : " · internal"}
            <br />
            {n.body}
          </p>
        ))}
        {!order.notes.length ? <p>No notes yet.</p> : null}
      </div>
    </>
  );
}
