import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { breadcrumbJsonLd, graphJsonLd, organizationJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = pageSeo({
  title: "About Us",
  description:
    "K9 Peptides Direct supplies research-grade canine peptides with third-party testing, cold-chain shipping, and veterinary-guided use. Learn our lab and vet standards.",
  path: "/about",
  image: "/images/t2.webp",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graphJsonLd([organizationJsonLd(), breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/t2.webp)" }}>
        <div className="w">
          <h1>Built by dog people. Verified by labs.</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Working dogs, athletes and senior companions deserve research-grade quality.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="w split">
          <img src="/images/lab.webp" alt="HPLC and mass-spec quality control lab" loading="lazy" width={720} height={480} />
          <div>
            <h2>Our standard</h2>
            <p>
              Independent HPLC and mass-spec testing on every lot, cold-chain fulfilment, and published
              COAs. Browse{" "}
              <a href="/shop" style={{ color: "var(--blue)" }}>
                peptides
              </a>{" "}
              or{" "}
              <a href="/bundles" style={{ color: "var(--blue)" }}>
                protocol bundles
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w split">
          <div>
            <h2>Vet network</h2>
            <p>
              Licensed veterinarians review each intake. Rehab specialists help shape our recovery
              protocols. Read the{" "}
              <a href="/dosing" style={{ color: "var(--blue)" }}>
                research guide
              </a>{" "}
              or{" "}
              <a href="/contact" style={{ color: "var(--blue)" }}>
                start an intake
              </a>
              .
            </p>
          </div>
          <img src="/images/rehab.webp" alt="Canine rehabilitation work with a therapist" loading="lazy" width={720} height={480} />
        </div>
      </section>
      <section className="sec">
        <div className="w grid">
          <div className="card">
            <div className="b">
              <h3>Our standard</h3>Every batch is third-party tested and published.
            </div>
          </div>
          <div className="card">
            <div className="b">
              <h3>Vet network</h3>Licensed veterinarians review intake forms.
            </div>
          </div>
          <div className="card">
            <div className="b">
              <h3>Canine-first dosing</h3>Charts scaled to weight, not guesswork.
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
