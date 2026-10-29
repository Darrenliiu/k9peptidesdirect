import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { breadcrumbJsonLd, graphJsonLd, organizationJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = pageSeo({
  title: "Contact",
  description:
    "Contact K9 Peptides Direct for protocol questions, order support, and veterinary partnerships. Email support@k9peptidesdirect.com, Monday–Friday 9–5 PT.",
  path: "/contact",
  image: "/images/vet.webp",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graphJsonLd([organizationJsonLd(), breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/vet.webp)" }}>
        <div className="w">
          <h1>Talk to our team</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Protocol questions, vet partnerships and order support.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w pd">
          <div>
            <Breadcrumbs items={crumbs} />
            <h2>How to reach us</h2>
            <p>Questions on protocols, orders or COAs? We reply within one business day.</p>
            <p>
              📧 support@k9peptidesdirect.com
              <br />🕘 Mon–Fri 9–5 PT
            </p>
            <p>
              Browse the{" "}
              <a href="/shop" style={{ color: "var(--blue)" }}>
                shop
              </a>
              ,{" "}
              <a href="/faq" style={{ color: "var(--blue)" }}>
                FAQ
              </a>
              , or{" "}
              <a href="/dosing" style={{ color: "var(--blue)" }}>
                research guide
              </a>{" "}
              while you wait.
            </p>
          </div>
          <form className="card" style={{ padding: 24 }} action="mailto:support@k9peptidesdirect.com">
            <input name="name" placeholder="Name" />
            <input name="email" type="email" placeholder="Email" />
            <select name="topic">
              <option>Topic: Order</option>
              <option>Protocol question</option>
              <option>Vet partnership</option>
            </select>
            <input name="dog" placeholder="Dog breed & weight" />
            <textarea name="message" rows={5} placeholder="Message" />
            <button className="btn" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
