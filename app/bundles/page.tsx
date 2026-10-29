import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { ProductCard } from "@/components/storefront/ProductCard";
import { listProducts } from "@/lib/catalog";
import { breadcrumbJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Bundles", path: "/bundles" },
];

export const metadata: Metadata = pageSeo({
  title: "Protocol Bundles",
  description:
    "Protocol bundles pairing research-grade canine peptides — Joint & Recovery, Senior Vitality, Performance, Cognitive, Gut & Healing, and Starter.",
  path: "/bundles",
  image: "/images/goal-joint.webp",
});

export default async function BundlesPage() {
  const products = (await listProducts()).filter((p) => p.category === "Bundles");
  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
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
          <Breadcrumbs items={crumbs} />
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
