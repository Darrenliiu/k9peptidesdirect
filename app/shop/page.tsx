import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { listProducts } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/catalog-data";
import { breadcrumbJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";
import { ShopFilters } from "./ui";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
];

export const metadata: Metadata = pageSeo({
  title: "Shop Canine Peptides",
  description:
    "Shop research-grade canine peptides and protocol bundles. Lab-verified singles and goal-based packs sold for veterinary-guided research use.",
  path: "/shop",
  image: "/images/run.webp",
});

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
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
          <Breadcrumbs items={crumbs} />
          <h2>All peptides and bundles</h2>
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
