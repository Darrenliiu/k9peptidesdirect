import { notFound } from "next/navigation";
import { AddToCart } from "@/components/storefront/AddToCart";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { Disclaimer, ProductCard } from "@/components/storefront/ProductCard";
import { getProductBySlug, listProducts, unitPrice } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const all = await listProducts();
  const paired = all.filter((p) => p.id !== product.id).slice(0, 3);
  const price = unitPrice(product, null);
  const title = product.slug === "bpc-157" ? "BPC-157 for Dogs" : product.name;

  return (
    <>
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
            <h1 style={{ color: "var(--navy)", fontSize: 42 }}>{title}</h1>
            <div>
              ★★★★★ <small>({product.reviewCount} reviews)</small>
            </div>
            <p className="price" style={{ fontSize: 30 }}>
              {formatMoney(price)}
            </p>
            <p>{product.description}</p>
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
            <Disclaimer />
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w">
          <h2>Often paired with</h2>
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
