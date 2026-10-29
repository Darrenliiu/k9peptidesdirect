import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { Disclaimer } from "@/components/storefront/ProductCard";

export const metadata = { title: "Research Guide" };

export default function DosingPage() {
  const rows = [
    ["BPC-157", "50 mcg", "100 mcg", "150–200 mcg", "4–6 wks"],
    ["TB-500", "0.25 mg", "0.5 mg", "1 mg", "4 wks"],
    ["NAD+", "5 mg", "10 mg", "20 mg", "Ongoing"],
    ["Glutathione", "25 mg", "50 mg", "100 mg", "4–8 wks"],
  ];
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/rehab.webp)" }}>
        <div className="w">
          <h1>Canine peptide research guide</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>Weight-based reference, reconstitution and storage.</p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Canine peptide research guide</h2>
          <p>Educational reference only — your veterinarian sets the final protocol.</p>
          <Disclaimer />
          <h3>Typical research ranges by weight</h3>
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
                  <tr key={r[0]}>
                    {r.map((c) => (
                      <td key={c}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13 }}>
            Illustrative placeholder values for mockup — confirm with veterinary guidance before
            publishing.
          </p>
          <h3>Reconstitution in 4 steps</h3>
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
