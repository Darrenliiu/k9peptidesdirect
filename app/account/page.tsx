import { formatMoney } from "@/lib/money";
import { listOrders } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const metadata = { title: "Account" };

export default async function AccountHome() {
  const session = await getSession();
  const orders = session
    ? await listOrders({ userId: session.user.id })
    : [];
  return (
    <>
      <h1>Welcome back</h1>
      <p>Hello {session?.user.name || session?.user.email}.</p>
      <h3>Recent orders</h3>
      {!orders.length ? <p>You haven&apos;t placed an order yet.</p> : null}
      {orders.slice(0, 5).map((o) => (
        <p key={o.id}>
          <a href={`/account/orders/${o.id}`}>
            {o.number}
          </a>{" "}
          · {o.status} · {formatMoney(o.totalCents)}
        </p>
      ))}
    </>
  );
}
