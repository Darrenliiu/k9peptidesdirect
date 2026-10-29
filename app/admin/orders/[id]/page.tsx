import { notFound } from "next/navigation";
import { updateOrderAction } from "@/app/actions/admin";
import { trackingUrl } from "@/lib/email";
import { formatMoney } from "@/lib/money";
import { ORDER_STATUSES, getOrder } from "@/lib/orders";

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();
  const ship = order.shippingAddress as Record<string, string>;
  const track = trackingUrl(order.trackingCarrier, order.trackingNumber);

  return (
    <>
      <h1>{order.number}</h1>
      <p className="lead">
        {order.email} · {order.createdAt.toLocaleString()} · {order.paymentStatus}
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
                  <td>{formatMoney(i.unitPriceCents * i.quantity)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}>Subtotal</td>
                <td>{formatMoney(order.subtotalCents)}</td>
              </tr>
              <tr>
                <td colSpan={2}>Shipping · {order.shippingMethod}</td>
                <td>{formatMoney(order.shippingCents)}</td>
              </tr>
              <tr>
                <td colSpan={2}>Tax</td>
                <td>{formatMoney(order.taxCents)}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>Total</b>
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
              {ship.line1} {ship.line2}
              <br />
              {ship.city}, {ship.state} {ship.postalCode}
              <br />
              {ship.country}
            </p>
            <p>Payment: {order.paymentProvider ?? "—"} · {order.paymentRef ?? "unpaid"}</p>
          </div>
          <form className="panel stack" action={updateOrderAction}>
            <h3>Fulfillment</h3>
            <input type="hidden" name="id" value={order.id} />
            <label>
              Status
              <select name="status" defaultValue={order.status}>
                {ORDER_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
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
              Internal / customer note
              <textarea name="note" rows={3} placeholder="Add a note" />
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
            {n.isCustomerVisible ? " · customer-visible" : ""}
            <br />
            {n.body}
          </p>
        ))}
        {!order.notes.length ? <p>No notes yet.</p> : null}
      </div>
    </>
  );
}
