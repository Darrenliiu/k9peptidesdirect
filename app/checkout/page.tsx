import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { getSession } from "@/lib/session";
import { CheckoutForm } from "./ui";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await getSession();
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1 style={{ fontSize: 36 }}>Checkout</h1>
          <p>Guest checkout is welcome. Sign in to attach this order to your account.</p>
          <CheckoutForm email={session?.user.email ?? ""} />
        </div>
      </section>
      <Footer />
    </>
  );
}
