import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { breadcrumbJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Research Guide", path: "/dosing" },
];

export const metadata = pageSeo({
  title: "Canine Peptide Research Guide",
  description:
    "Canine peptide research guide: weight-based reference ranges, reconstitution steps, and storage notes. Educational only — confirm every protocol with a licensed veterinarian.",
  path: "/dosing",
  image: "/images/rehab.webp",
});

const rows = [
  { name: "BPC-157", slug: "bpc-157", cols: ["50 mcg", "100 mcg", "150–200 mcg", "4–6 wks"] },
  { name: "TB-500", slug: "tb-500", cols: ["0.25 mg", "0.5 mg", "1 mg", "4 wks"] },
  { name: "NAD+", slug: "nad", cols: ["5 mg", "10 mg", "20 mg", "Ongoing"] },
  { name: "Glutathione", slug: "glutathione", cols: ["25 mg", "50 mg", "100 mg", "4–8 wks"] },
];

export default function DosingPage() {
  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/rehab.webp)" }}>
        <div className="w">
          <h1>Canine peptide research guide</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>Weight-based reference, reconstitution and storage.</p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <Breadcrumbs items={crumbs} />
          <p>
            Educational reference only — your veterinarian sets the final protocol. These ranges are
            illustrative placeholders for the storefront, not a prescription. See{" "}
            <a href="/faq" style={{ color: "var(--blue)" }}>
              FAQ
            </a>{" "}
            or{" "}
            <a href="/contact" style={{ color: "var(--blue)" }}>
              contact the team
            </a>
            .
          </p>
          <h2>Typical research ranges by weight</h2>
          <div className="tw">
            <table>
              <tbody>
                <tr>
                  <th>Peptide</th>
                  <th>&lt;25 lb</th>
                  <th>25–60 lb</th>
                  <th>60+ lb</th>
                  <th>Cycle</th>
                </tr>
                {rows.map((r) => (
                  <tr key={r.slug}>
                    <td>
                      <a href={`/product/${r.slug}`} style={{ color: "var(--blue)" }}>
                        {r.name}
                      </a>
                    </td>
                    {r.cols.map((c) => (
                      <td key={c}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13 }}>
            Illustrative placeholder values — confirm with veterinary guidance before use.
          </p>
          <h2>Reconstitution in 4 steps</h2>
          <ol>
            <li>Wipe vial tops with alcohol.</li>
            <li>Add bacteriostatic water slowly down the vial wall.</li>
            <li>Swirl gently — never shake.</li>
            <li>Refrigerate at 2–8°C; use within 30 days.</li>
          </ol>
        </div>
      </section>
      <Footer />
    </>
  );
}
