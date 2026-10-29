import { notFound } from "next/navigation";
import { trackingUrl } from "@/lib/email";
import { formatMoney } from "@/lib/money";
import { getOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";
import { isAdminUser } from "@/lib/roles";

export default async function AccountOrder({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const { id } = await params;
  const order = await getOrder(id);
  if (!order || !session) notFound();
  const allowed =
    order.userId === session.user.id ||
    order.email.toLowerCase() === session.user.email.toLowerCase() ||
    isAdminUser(session.user);
  if (!allowed) notFound();
  const ship = order.shippingAddress as Record<string, string>;
  const track = trackingUrl(order.trackingCarrier, order.trackingNumber);
  return (
    <>
      <h1>{order.number}</h1>
      <p>
        Status: <b>{order.status}</b> · Payment: {order.paymentStatus}
      </p>
      {order.trackingNumber ? (
        <p>
          Tracking: {order.trackingCarrier} {order.trackingNumber}
          {track ? (
            <>
              {" "}
              ·{" "}
              <a href={track} target="_blank" rel="noreferrer">
                Track shipment
              </a>
            </>
          ) : null}
        </p>
      ) : (
        <p>Tracking will appear here once the order ships.</p>
      )}
      <div className="tw">
        <table>
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
              <td colSpan={2}>Total</td>
              <td>{formatMoney(order.totalCents)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ship to {ship.firstName} {ship.lastName}, {ship.line1}, {ship.city} {ship.state}
      </p>
      {order.notes
        .filter((n) => n.isCustomerVisible)
        .map((n) => (
          <p key={n.id} className="disc">
            {n.body}
          </p>
        ))}
    </>
  );
}
