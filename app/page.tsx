import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { NewsletterCta } from "@/components/storefront/Newsletter";
import { ProductCard } from "@/components/storefront/ProductCard";
import { featuredProducts, listProducts } from "@/lib/catalog";
import { Paw } from "@/components/storefront/Logo";
import { formatMoney, displayPrice } from "@/lib/money";
import { BUNDLE_INCLUDES, SEED_PRODUCTS } from "@/lib/catalog-data";
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
  { g: "Joint & Mobility", d: "Aging joints, hips, everyday movement", i: "goal-joint", href: "/product/joint-pack", tone: "sky" },
  { g: "Surgery Recovery", d: "Pre/post-op tissue research", i: "goal-surgery", href: "/product/bpc-157", tone: "sage" },
  { g: "Senior Longevity", d: "Energy and cellular health", i: "goal-senior", href: "/product/senior-pack", tone: "sand" },
  { g: "Working & Sport", d: "Performance and fast recovery", i: "goal-performance", href: "/product/performance-pack", tone: "dusk" },
] as const;

const FAQS = [
  { q: "Where can I see lab results?", a: "Every published certificate of analysis lives in the COA library, searchable by product and lot number." },
  { q: "How is my order shipped?", a: "Orders ship in insulated cold-pack packaging to help protect lyophilized vials in transit." },
  { q: "What comes in the box?", a: "Single vials include bacteriostatic water, insulin syringes, alcohol pads and a weight-based dosing card." },
  { q: "How can I pay?", a: "Checkout supports Zelle, Cash App, Venmo, PayPal and crypto." },
] as const;

const NAMES = new Map(SEED_PRODUCTS.map((p) => [p.slug, p.name]));
const includes = (slug: string) => (BUNDLE_INCLUDES[slug] ?? []).map((s) => NAMES.get(s) ?? s).join(" + ");

export default async function HomePage() {
  if (hasDatabase()) await ensureReady();
  const featured = await featuredProducts();
  const bundles = (await listProducts()).filter((p) => p.category === "Bundles");
  const [lead, ...rest] = bundles;

  return (
    <>
      <link rel="preload" as="image" href="/images/run.webp" fetchPriority="high" />
      <JsonLd data={graphJsonLd([organizationJsonLd(), websiteJsonLd()])} />
      <Header />
      <section className="pl-hero">
        <img className="pl-hero-bg" src="/images/run.webp" alt="Dog running along a beach at sunset" width={1280} height={720} fetchPriority="high" />
        <div className="pl-hero-in">
          <p className="eyebrow">Lab-verified · COAs published</p>
          <h1>
            Peptide support for the dogs who <em>give everything.</em>
          </h1>
          <p className="pl-lede">
            Recovery, mobility, longevity and performance protocols, precision-dosed for canine body weight and backed by
            third-party COAs.
          </p>
          <div className="pl-cta">
            <a className="btn" href="/shop">Shop Peptides</a>
            <a className="btn glass" href="/dosing">Find a Protocol</a>
          </div>
        </div>
        <ul className="pl-badges" aria-label="Why K9 Peptides Direct">
          <li>🧪 Third-party HPLC tested</li>
          <li>❄️ Cold-pack shipping</li>
          <li>📄 Batch COAs published</li>
        </ul>
      </section>

      <section className="pl-trust" aria-label="Our standards">
        <div className="w">
          <div><b>99%+ purity</b><span>Third-party HPLC tested</span></div>
          <div><b>Cold-chain</b><span>Insulated shipping</span></div>
          <div><b>COA library</b><span>Every batch published</span></div>
          <div><b>Dosing card</b><span>Weight-based, in every box</span></div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <div className="pl-head">
            <p className="eyebrow">Shop by goal</p>
            <h2>What does your dog <em>need</em> most?</h2>
          </div>
          <div className="pl-goals">
            {GOALS.map((g) => (
              <a className={`pl-goal tone-${g.tone}`} href={g.href} key={g.i}>
                <span className="pl-goal-c">
                  <h3>{g.g}</h3>
                  <span>{g.d}</span>
                  <span className="pl-more">Explore →</span>
                </span>
                <img src={`/images/${g.i}.webp`} alt={g.g} loading="lazy" width={576} height={432} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="w">
          <div className="pl-head row">
            <div>
              <p className="eyebrow">Favorites</p>
              <h2>Best sellers</h2>
            </div>
            <a className="pl-link" href="/shop">Shop all →</a>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {lead ? (
        <section className="sec">
          <div className="w">
            <div className="pl-head row">
              <div>
                <p className="eyebrow">Protocol bundles</p>
                <h2>Matched vials, <em>one goal</em></h2>
              </div>
              <a className="pl-link" href="/bundles">All bundles →</a>
            </div>
            <div className="pl-bento">
              <a className="pl-b1" href={`/product/${lead.slug}`}>
                <img src={lead.image} alt={lead.name} loading="lazy" width={600} height={600} />
                <span>
                  <span className="eyebrow">Most complete</span>
                  <h3>{lead.name}</h3>
                  <span className="pl-inc">{includes(lead.slug)}</span>
                  <b>{formatMoney(displayPrice(lead))}</b>
                </span>
              </a>
              {rest.slice(0, 4).map((b) => (
                <a className="pl-bx" href={`/product/${b.slug}`} key={b.id}>
                  <img src={b.image} alt={b.name} loading="lazy" width={300} height={300} />
                  <span>
                    <h3>{b.name}</h3>
                    <span className="pl-inc">{includes(b.slug)}</span>
                    <b>{formatMoney(displayPrice(b))}</b>
                  </span>
                </a>
              ))}
              <div className="pl-bq">
                <Paw className="pl-bq-paw" />
                <div>
                  <h3>Protocol bundles</h3>
                  <p>Pre-matched vials for a single goal, each with a weight-based dosing card.</p>
                </div>
                <a className="btn light" href="/bundles">See all bundles</a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="pl-lab">
        <img src="/images/lab.webp" alt="Independent quality-control laboratory" loading="lazy" width={1280} height={720} />
        <div className="pl-lab-c">
          <p className="eyebrow">Quality first</p>
          <h2>Tested by a lab, <em>not just trusted.</em></h2>
          <ul className="pl-checks">
            <li><b>Independent testing</b><span>Each lot is HPLC- and mass-spec-tested by an independent lab before it ships.</span></li>
            <li><b>Traceable batches</b><span>Certificates are published for every batch number printed on your vial.</span></li>
            <li><b>Shipped cold</b><span>Insulated cold-pack packaging on every order.</span></li>
          </ul>
          <p>
            See the <a href="/about">quality standard</a> and <a href="/faq">COA questions</a>.
          </p>
          <a className="btn n" href="/coa">Browse COAs</a>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <div className="pl-head center">
            <p className="eyebrow">How it works</p>
            <h2>Three simple <em>steps</em></h2>
          </div>
          <ol className="pl-steps">
            <li><h3>Pick a goal</h3><p>Mobility, recovery, longevity or performance. Start with a single vial or a bundle.</p></li>
            <li><h3>Talk to your vet</h3><p>Review the <a href="/dosing">research guide</a> together, or <a href="/contact">contact us</a> with questions. Always follow your veterinarian&apos;s direction.</p></li>
            <li><h3>Dose by weight</h3><p>Every vial ships with a weight-based dosing card for small, medium and large dogs.</p></li>
          </ol>
        </div>
      </section>

      <section className="sec alt">
        <div className="w pl-faq">
          <div>
            <p className="eyebrow">Questions</p>
            <h2>Good to <em>know</em></h2>
            <p><a className="pl-link" href="/faq">Read the full FAQ →</a></p>
            <img src="/images/goal-senior.webp" alt="Senior dog resting outdoors" loading="lazy" width={576} height={432} />
          </div>
          <div>
            {FAQS.map((f) => (
              <details className="pl-q" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <NewsletterCta />
      <Footer />
    </>
  );
}
