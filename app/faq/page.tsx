import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export const metadata = { title: "FAQ" };

const QA = [
  ["Are peptides safe for dogs?", "Research is emerging; we require a veterinary consult before any protocol."],
  ["Do I need a prescription?", "Products are sold for research/vet-guided use. Our intake form connects you with a vet."],
  ["How are products shipped?", "Insulated cold packs, 1–3 day shipping."],
  ["How do I choose a dose?", "Use our weight-based guide and confirm with your vet."],
  ["Can I see test results?", "Yes — every batch COA is published."],
  ["What's your return policy?", "Unopened products within 30 days."],
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/goal-senior.webp)" }}>
        <div className="w">
          <h1>Frequently asked questions</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Straight answers on safety, dosing, shipping and testing.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Frequently asked questions</h2>
          {QA.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
