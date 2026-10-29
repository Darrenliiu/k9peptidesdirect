import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/storefront/AddToCart";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { ProductCard } from "@/components/storefront/ProductCard";
import { BUNDLE_INCLUDES } from "@/lib/catalog-data";
import { getProductBySlug, listProducts, unitPrice } from "@/lib/catalog";
import { listPublishedCoasForProduct, publicCoaPath } from "@/lib/coas";
import { formatMoney } from "@/lib/money";
import { breadcrumbJsonLd, graphJsonLd, pageSeo, productJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return pageSeo({
      title: "Product not found",
      description: "That product is no longer listed.",
      path: `/product/${slug}`,
      index: false,
    });
  }
  const title =
    product.category === "Bundles"
      ? product.name
      : `${product.name} for Dogs`;
  return pageSeo({
    title,
    description: `${product.shortDescription} Research-grade and lab-verified. Sold for veterinary-guided research use only.`,
    path: `/product/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const all = await listProducts();
  const includeSlugs = BUNDLE_INCLUDES[product.id] ?? [];
  const included = includeSlugs
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const publishedCoas = await listPublishedCoasForProduct(product.id);
  const paired = (
    included.length
      ? included
      : all.filter((p) => p.id !== product.id && p.category !== "Bundles")
  ).slice(0, 3);
  const price = unitPrice(product, null);
  const title = product.category === "Bundles" ? product.name : `${product.name} for Dogs`;
  const parent = product.category === "Bundles"
    ? { name: "Bundles", path: "/bundles" }
    : { name: "Shop", path: "/shop" };
  const crumbs = [
    { name: "Home", path: "/" },
    parent,
    { name: product.name, path: `/product/${product.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graphJsonLd([
          productJsonLd({
            name: product.name,
            description: product.description,
            image: product.image,
            sku: product.sku,
            slug: product.slug,
            priceCents: price,
            stock: product.stock,
            coas: publishedCoas.map((c) => ({
              lot: c.lot,
              purityPercent: c.purityPercent,
              url: publicCoaPath(c.id),
            })),
          }),
          breadcrumbJsonLd(crumbs),
        ])}
      />
      <Header />
      <section className="sec">
        <div className="w">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="w pd">
          <div className="img card">
            <img
              src={product.image}
              alt={`${product.name} — research-grade canine peptide`}
              width={800}
              height={800}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div>
            <span className="tag">{product.category}</span>
            <h1 style={{ color: "var(--navy)", fontSize: 42, marginBottom: 8 }}>{title}</h1>
            <p className="price" style={{ fontSize: 30, marginTop: 8 }}>
              {formatMoney(price)}
            </p>
            <p>{product.description}</p>
            {included.length ? (
              <div className="bundle-includes">
                <h2 style={{ fontSize: 18, margin: "8px 0 10px" }}>What&apos;s included</h2>
                <ul>
                  {included.map((item) => (
                    <li key={item.id}>
                      <a href={`/product/${item.slug}`} style={{ color: "var(--blue)" }}>
                        {item.name}
                      </a>
                      {" — "}
                      {item.shortDescription}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <AddToCart product={product} />
            <p style={{ fontSize: 14 }}>
              {publishedCoas.length
                ? `✓ Latest COA lot ${publishedCoas[0].lot}`
                : "COA coming soon"}
              {" · "}
              ✓ Cold-pack shipping · ✓ Vet screening included
            </p>
            <details open>
              <summary>Research overview</summary>
              <p>{product.researchOverview}</p>
            </details>
            <details>
              <summary>Dosing & reconstitution</summary>
              <p>
                See the{" "}
                <a href="/dosing" style={{ color: "var(--blue)" }}>
                  research guide
                </a>
                . Always follow your veterinarian&apos;s direction.
              </p>
            </details>
            <details>
              <summary>What&apos;s in the box</summary>
              <p>{product.boxContents}</p>
            </details>
            <details open={publishedCoas.length > 0}>
              <summary>Certificate of Analysis</summary>
              {publishedCoas.length ? (
                <ul className="coa-product-list">
                  {publishedCoas.map((c) => (
                    <li key={c.id}>
                      <strong>{c.lot}</strong>
                      {c.testDate ? ` · ${c.testDate}` : ""}
                      {c.purityPercent ? ` · ${c.purityPercent}%` : ""}
                      {c.labName ? ` · ${c.labName}` : ""}
                      {" — "}
                      <a href={publicCoaPath(c.id)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
                        View
                      </a>
                      {" / "}
                      <a href={publicCoaPath(c.id, { download: true })} style={{ color: "var(--blue)" }}>
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  COA coming soon. Published lot files will appear here and in the{" "}
                  <a href="/coa" style={{ color: "var(--blue)" }}>
                    COA library
                  </a>
                  . Until then, no certificate should be inferred from this page.
                </p>
              )}
            </details>
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w">
          <h2>{included.length ? "Peptides in this bundle" : "Often paired with"}</h2>
          <div className="grid">
            {paired.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
