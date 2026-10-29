import type { Metadata } from "next";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { ProductCard } from "@/components/storefront/ProductCard";
import { listProducts } from "@/lib/catalog";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";

export const metadata: Metadata = {
  title: "Bundles",
  description: "Protocol bundles pairing research-grade canine peptides.",
  alternates: { canonical: `${SITE}/bundles` },
};

export default async function BundlesPage() {
  const products = (await listProducts()).filter((p) => p.category === "Bundles");
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/goal-joint.webp)" }}>
        <div className="w">
          <h1>Protocol bundles</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Pairings built from our single peptides — each bundle has its own page, price and add to cart.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Shop bundles</h2>
          <div className="grid" id="bundles">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
