import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/storefront/AddToCart";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { ProductCard } from "@/components/storefront/ProductCard";
import { BUNDLE_INCLUDES } from "@/lib/catalog-data";
import { getProductBySlug, listProducts, unitPrice } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const title = product?.name ?? "Product";
  return {
    title,
    description: product?.shortDescription,
    alternates: { canonical: `${SITE}/product/${slug}` },
  };
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
  const paired = (
    included.length
      ? included
      : all.filter((p) => p.id !== product.id && p.category !== "Bundles")
  ).slice(0, 3);
  const price = unitPrice(product, null);
  const title = product.category === "Bundles" ? product.name : `${product.name} for Dogs`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE}${product.image}`,
    sku: product.sku,
    brand: { "@type": "Brand", name: "K9 Peptides Direct" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${SITE}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <section className="sec">
        <div className="w pd">
          <div className="img card">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                <h3 style={{ fontSize: 18, margin: "8px 0 10px" }}>What&apos;s included</h3>
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
              ✓ COA batch published &nbsp; ✓ Cold-pack shipping &nbsp; ✓ Vet screening included
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
            <details>
              <summary>Certificate of Analysis</summary>
              <p>{product.coa}</p>
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
