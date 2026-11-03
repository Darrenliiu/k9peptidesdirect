import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

import { noIndexSeo } from "@/lib/seo";
import { getOrderByNumber } from "@/lib/orders";
import { PaymentStatus } from "./status";

export const dynamic = "force-dynamic";

export const metadata = noIndexSeo("Order request received", "/checkout/success");

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const row = order ? await getOrderByNumber(order).catch(() => null) : null;
  if (order && row && row.paymentProvider === "peerpay") {
    return (
      <>
        <Header />
        <section className="sec">
          <div className="w">
            <PaymentStatus order={order} initial={row.paymentStatus} />
            <p>
              <a className="btn" href="/account/orders">
                View order history
              </a>
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1>Request received</h1>
          <p>
            Your order request number is {order ? <b>{order}</b> : <b>on the way by email</b>}.
            No payment was taken.
          </p>
          <p>
            We will follow up shortly to confirm the details and arrange payment. Keep this request
            number handy if you write or call us.
          </p>
          <p>
            <a className="btn" href="/account/orders">
              View request history
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
