import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { noIndexSeo } from "@/lib/seo";
import { getSession } from "@/lib/session";
import { paymentMode } from "@/lib/payments";
import { CheckoutForm } from "./ui";
import "./checkout.css";

export const metadata = noIndexSeo("Checkout", "/checkout");

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ cancelled?: string }>;
}) {
  const session = await getSession();
  const { cancelled } = await searchParams;
  const preview = process.env.CHECKOUT_UI_PREVIEW === "1";
  const payNow = preview || paymentMode() === "peerpay";
  return (
    <>
      <Header />
      <section className="co-wrap">
        <div className="w">
          <div className="co-head">
            <h1>{payNow ? "Checkout" : "Request Your Order"}</h1>
            <p>
              {session?.user.email ? (
                <>Signed in as <b>{session.user.email}</b>. This order will attach to your account.</>
              ) : (
                <>Guest checkout is welcome. <a href="/login?next=/checkout">Returning customer? Sign in</a></>
              )}
            </p>
          </div>
          {preview ? (
            <p className="co-banner">Preview build: placing orders is disabled here, so nothing is created or charged.</p>
          ) : null}
          {cancelled ? (
            <p className="co-banner">Payment for order {cancelled} was not completed. You can try again below.</p>
          ) : null}
          <CheckoutForm email={session?.user.email ?? ""} payNow={payNow} />
        </div>
      </section>
      <Footer />
    </>
  );
}
