import type { Metadata } from "next";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { listProducts } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/catalog-data";
import { ShopFilters } from "./ui";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";

export const metadata: Metadata = {
  title: "Shop",
  alternates: { canonical: `${SITE}/shop` },
};

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/run.webp)" }}>
        <div className="w">
          <h1>Shop peptides for dogs</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Lab-verified single peptides and goal-based protocol bundles.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Shop all peptides</h2>
          <ShopFilters
            products={products.map((p) => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              category: p.category,
              shortDescription: p.shortDescription,
              image: p.image,
              priceCents: p.priceCents,
              salePriceCents: p.salePriceCents,
            }))}
            categories={[...CATEGORIES]}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
