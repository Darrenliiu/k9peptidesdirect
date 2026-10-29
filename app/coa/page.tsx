import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { NewsletterForm } from "@/components/storefront/Newsletter";
import { listProducts } from "@/lib/catalog";
import { listPublishedCoas, publicCoaPath } from "@/lib/coas";
import { breadcrumbJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Certificates of Analysis", path: "/coa" },
];

export const metadata = pageSeo({
  title: "Certificates of Analysis",
  description:
    "Third-party certificates of analysis for K9 Peptides Direct lots: identity, purity, and related lab tests. Search by product or batch when files are published.",
  path: "/coa",
  image: "/images/lab.webp",
});

export const dynamic = "force-dynamic";

function formatDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export default async function CoaLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const productId = sp.product?.trim() || undefined;
  const q = sp.q?.trim() || undefined;
  const products = await listProducts();
  const rows = await listPublishedCoas({ productId, q });

  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/lab.webp)" }}>
        <div className="w">
          <h1>Certificates of Analysis</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Third-party lot paperwork — identity, purity, and related tests — published when a batch is released.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <Breadcrumbs items={crumbs} />
          <p>
            A COA is a laboratory report for one lot, not an FDA evaluation and not a medical claim. Read{" "}
            <a href="/blog/how-to-read-a-coa" style={{ color: "var(--blue)" }}>
              how to read a COA
            </a>
            . Products remain for research and veterinary-guided use only.
          </p>

          <form className="coa-filters" method="get" action="/coa">
            <label>
              <span className="sr-only">Product</span>
              <select name="product" defaultValue={productId || ""}>
                <option value="">All products</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Search lot or product</span>
              <input name="q" type="search" placeholder="Batch / lot, product, or lab" defaultValue={q || ""} />
            </label>
            <button className="btn n" type="submit">
              Search
            </button>
          </form>

          {rows.length ? (
            <div className="coa-table-wrap">
              <table className="coa-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Batch / lot</th>
                    <th>Test date</th>
                    <th>Lab</th>
                    <th>Purity</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <a href={`/product/${row.product.slug}`} style={{ color: "var(--blue)" }}>
                          {row.product.name}
                        </a>
                      </td>
                      <td>{row.lot}</td>
                      <td>{formatDate(row.testDate)}</td>
                      <td>{row.labName || "—"}</td>
                      <td>{row.purityPercent ? `${row.purityPercent}%` : "—"}</td>
                      <td>
                        <a href={publicCoaPath(row.id)} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                        {" · "}
                        <a href={publicCoaPath(row.id)} download={row.fileName || `${row.lot}.pdf`}>
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="coa-soon">
              <span className="tag">Library in progress</span>
              <h2>COAs coming soon</h2>
              <p>
                Independent laboratory reports will appear here by product and lot number as batches are
                released. Until then, nothing on this page is a substitute for a veterinarian, and no
                lot file should be inferred from catalog copy.
              </p>
              <div className="grid">
                <div className="card">
                  <div className="b">
                    <h3>Identity</h3>
                    Mass spectrometry and chromatographic retention confirm the claimed sequence or
                    compound — not a nickname on the box.
                  </div>
                </div>
                <div className="card">
                  <div className="b">
                    <h3>Purity</h3>
                    HPLC area-percent is a method result for that lot. It is not a clinical grade or an
                    outcome.
                  </div>
                </div>
                <div className="card">
                  <div className="b">
                    <h3>Related tests</h3>
                    Endotoxin, residual solvent, and water content are run when specified for the lot.
                    Absence on a future COA means “not shown,” not “must be fine.”
                  </div>
                </div>
                <div className="card">
                  <div className="b">
                    <h3>Lot match</h3>
                    The PDF must match the batch printed on the vial. A report for a different lot is a
                    different product.
                  </div>
                </div>
              </div>
              <div className="coa-notify">
                <h3>Get notified when lot files are posted</h3>
                <p>Same list as restocks and research notes. We will not invent a certificate to fill this page.</p>
                <NewsletterForm source="coa" id="nl-coa-email" submitLabel="Notify me" />
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
