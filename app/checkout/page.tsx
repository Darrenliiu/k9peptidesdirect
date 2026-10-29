import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { getSession } from "@/lib/session";
import { CheckoutForm } from "./ui";

export const metadata = { title: "Request Your Order" };

export default async function CheckoutPage() {
  const session = await getSession();
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1 style={{ fontSize: 36 }}>Request Your Order</h1>
          <p>
            No payment is taken on this page. Submit the request and our team will follow up to
            confirm the order and arrange payment. Guest requests are welcome
            {session?.user.email ? "; this request will attach to your account." : ". Sign in first if you want it attached to an account."}
          </p>
          <CheckoutForm email={session?.user.email ?? ""} />
        </div>
      </section>
      <Footer />
    </>
  );
}
