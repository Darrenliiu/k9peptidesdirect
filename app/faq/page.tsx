import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata = pageSeo({
  title: "Frequently Asked Questions",
  description:
    "Answers on safety, veterinary guidance, shipping, dosing, certificates of analysis, and returns for K9 Peptides Direct research-grade canine peptides.",
  path: "/faq",
  image: "/images/goal-senior.webp",
});

const QA = [
  {
    q: "Are peptides safe for dogs?",
    a: "Research is emerging and products are sold for research and veterinary-guided use only. We ask for a veterinary consult before any protocol. They are not intended to diagnose, treat, cure, or prevent disease.",
  },
  {
    q: "Do I need a prescription?",
    a: "Products are sold for research and vet-guided use. Our intake form on the contact page connects you with a veterinarian.",
  },
  {
    q: "How are products shipped?",
    a: "Insulated cold packs with typical 1–3 day transit. Free cold-pack shipping on orders over $150.",
  },
  {
    q: "How do I choose a dose?",
    a: "Use the weight-based research guide and confirm every protocol with your veterinarian. Charts in the box are educational references, not prescriptions.",
  },
  {
    q: "Can I see test results?",
    a: "Yes. Every published batch certificate of analysis is listed on the product page. A full COA library is in progress.",
  },
  {
    q: "What's your return policy?",
    a: "Unopened products may be returned within 30 days. Contact support@k9peptidesdirect.com to start a return.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs), faqJsonLd(QA)])} />
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
          <Breadcrumbs items={crumbs} />
          <p>
            More detail lives in the{" "}
            <a href="/dosing" style={{ color: "var(--blue)" }}>
              research guide
            </a>
            ,{" "}
            <a href="/about" style={{ color: "var(--blue)" }}>
              quality standard
            </a>
            , and{" "}
            <a href="/contact" style={{ color: "var(--blue)" }}>
              contact page
            </a>
            .
          </p>
          {QA.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
