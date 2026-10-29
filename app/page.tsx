import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { NewsletterCta } from "@/components/storefront/Newsletter";
import { ProductCard } from "@/components/storefront/ProductCard";
import { featuredProducts } from "@/lib/catalog";
import { ensureReady } from "@/lib/ensure";
import { hasDatabase } from "@/lib/db";
import { pageSeo } from "@/lib/seo";
import { graphJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata = pageSeo({
  title: "K9 Peptides Direct — Research-Grade Canine Peptides",
  description:
    "Research-grade peptides for canine wellness. Lab-verified vials and protocol bundles, sold for veterinary-guided research use. Cold-pack shipping on every order.",
  path: "/",
  absoluteTitle: true,
});

const GOALS = [
  { g: "Joint & Mobility", d: "Arthritis, hips, aging joints", i: "goal-joint", href: "/product/joint-pack" },
  { g: "Surgery Recovery", d: "Pre/post-op tissue support", i: "goal-surgery", href: "/product/bpc-157" },
  { g: "Senior Longevity", d: "Energy and cellular health", i: "goal-senior", href: "/product/senior-pack" },
  { g: "Working & Sport", d: "Performance and fast recovery", i: "goal-performance", href: "/product/performance-pack" },
] as const;

const GALLERY = [
  { i: "run", alt: "Dog running across a field" },
  { i: "goal-performance", alt: "Sport dog in training" },
  { i: "rehab", alt: "Canine rehab session" },
  { i: "goal-joint", alt: "Senior dog on a walk" },
  { i: "t1", alt: "Handler with a working dog" },
  { i: "goal-senior", alt: "Older companion dog outdoors" },
] as const;

export default async function HomePage() {
  if (hasDatabase()) await ensureReady();
  const featured = await featuredProducts();

  return (
    <>
      <link rel="preload" as="image" href="/images/hero-dog.webp" fetchPriority="high" />
      <JsonLd data={graphJsonLd([organizationJsonLd(), websiteJsonLd()])} />
      <Header />
      <section className="fb" style={{ backgroundImage: "url(/images/hero-dog.webp)" }}>
        <div className="w">
          <div className="c">
            <span className="tag">Lab-verified · Vet-informed</span>
            <h1>Peptide support built for the dogs who give everything.</h1>
            <p style={{ fontSize: 19, opacity: 0.9 }}>
              Recovery, mobility, longevity and performance protocols — precision-dosed for canine
              body weight and backed by third-party COAs.
            </p>
            <a className="btn" href="/shop">
              Shop Peptides
            </a>{" "}
            &nbsp;
            <a className="btn o" href="/dosing">
              Find a Protocol
            </a>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w trust">
          <div>
            <p>
              <strong>🧪 99%+ Purity</strong>
            </p>
            Third-party HPLC tested
          </div>
          <div>
            <p>
              <strong>🩺 Vet-Consult</strong>
            </p>
            Screening before protocols
          </div>
          <div>
            <p>
              <strong>❄️ Cold-Chain</strong>
            </p>
            Insulated shipping
          </div>
          <div>
            <p>
              <strong>📄 COA Library</strong>
            </p>
            Every batch published
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w">
          <h2>Shop by goal</h2>
          <p>Choose a goal — we&apos;ll match the protocol.</p>
          <div className="grid">
            {GOALS.map((g) => (
              <a className="goal" href={g.href} key={g.i}>
                <img src={`/images/${g.i}.webp`} alt={g.g} loading="lazy" width={560} height={360} />
                <div>
                  <h3>{g.g}</h3>
                  <p style={{ margin: "4px 0 0" }}>{g.d} →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Best sellers</h2>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="stats">
        <div className="w">
          <div>
            <b>12k+</b>Dogs supported
          </div>
          <div>
            <b>99.2%</b>Avg. HPLC purity
          </div>
          <div>
            <b>48</b>Partner vets
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w split">
          <img src="/images/lab.webp" alt="Independent quality-control laboratory" loading="lazy" width={720} height={480} />
          <div>
            <span className="tag">Quality first</span>
            <h2>Every batch, independently verified</h2>
            <p>
              Each lot is HPLC- and mass-spec-tested by an independent lab before it ships.
              Certificates are published for every batch number printed on your vial. See the{" "}
              <a href="/about" style={{ color: "var(--blue)" }}>
                quality standard
              </a>{" "}
              and{" "}
              <a href="/faq" style={{ color: "var(--blue)" }}>
                COA questions
              </a>
              .
            </p>
            <a className="btn n" href="/about">
              Our standards
            </a>
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w split">
          <div>
            <span className="tag">Vet-guided</span>
            <h2>Screened by veterinarians, not algorithms</h2>
            <p>
              Our intake connects you with licensed vets who review your dog&apos;s history before any
              protocol is fulfilled. Start from{" "}
              <a href="/contact" style={{ color: "var(--blue)" }}>
                contact
              </a>{" "}
              or browse the{" "}
              <a href="/dosing" style={{ color: "var(--blue)" }}>
                research guide
              </a>
              .
            </p>
            <a className="btn" href="/contact">
              Start intake
            </a>
          </div>
          <img src="/images/vet.webp" alt="Veterinarian examining a dog" loading="lazy" width={720} height={480} />
        </div>
      </section>
      <section className="sec">
        <div className="w gal">
          {GALLERY.map((g) => (
            <img key={g.i} src={`/images/${g.i}.webp`} alt={g.alt} loading="lazy" width={400} height={300} />
          ))}
        </div>
      </section>
      <section className="sec alt">
        <div className="w">
          <h2>How it works</h2>
          <div className="grid">
            <div className="card">
              <div className="b">
                <h3>1 · Take the finder quiz</h3>Tell us breed, weight, age and goals.
              </div>
            </div>
            <div className="card">
              <div className="b">
                <h3>2 · Vet screening</h3>Quick health intake reviewed before shipping.
              </div>
            </div>
            <div className="card">
              <div className="b">
                <h3>3 · Pre-dosed protocol</h3>Weight-based dosing chart in every box.
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsletterCta />
      <Footer />
    </>
  );
}
