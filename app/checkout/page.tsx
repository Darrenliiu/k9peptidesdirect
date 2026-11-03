import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { noIndexSeo } from "@/lib/seo";
import { getSession } from "@/lib/session";
import { paymentMode } from "@/lib/payments";
import { CheckoutForm } from "./ui";

export const metadata = noIndexSeo("Request Your Order", "/checkout");

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();
  const payNow = paymentMode() === "peerpay";
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1 style={{ fontSize: 36 }}>{payNow ? "Checkout" : "Request Your Order"}</h1>
          {payNow ? (
            <p>
              Enter your shipping details, then pay securely through Peer Pay. Guest checkout is welcome
              {session?.user.email ? "; this order will attach to your account." : "."}
            </p>
          ) : (
          <p>
            No payment is taken on this page. Submit the request and our team will follow up to
            confirm the order and arrange payment. Guest requests are welcome
            {session?.user.email ? "; this request will attach to your account." : ". Sign in first if you want it attached to an account."}
          </p>
          )}
          <CheckoutForm email={session?.user.email ?? ""} payNow={payNow} />
        </div>
      </section>
      <Footer />
    </>
  );
}
