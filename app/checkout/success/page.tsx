import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export const metadata = { title: "Order request received" };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
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
