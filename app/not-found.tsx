import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1>Page not found</h1>
          <p>
            <a className="btn" href="/shop">
              Back to shop
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
