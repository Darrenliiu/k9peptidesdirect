import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export const metadata = { title: "Order confirmed" };

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
          <h1>Thank you</h1>
          <p>
            Your order {order ? <b>{order}</b> : ""} is in. You can track it any time from your
            account.
          </p>
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
