import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { Disclaimer, ProductCard } from "@/components/storefront/ProductCard";
import { featuredProducts } from "@/lib/catalog";
import { ensureReady } from "@/lib/ensure";
import { hasDatabase } from "@/lib/db";

const GOALS = [
  { g: "Joint & Mobility", d: "Arthritis, hips, aging joints", i: "goal-joint" },
  { g: "Surgery Recovery", d: "Pre/post-op tissue support", i: "goal-surgery" },
  { g: "Senior Longevity", d: "Energy and cellular health", i: "goal-senior" },
  { g: "Working & Sport", d: "Performance and fast recovery", i: "goal-performance" },
] as const;

export default async function HomePage() {
  if (hasDatabase()) await ensureReady();
  const featured = await featuredProducts();

  return (
    <>
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
            <h3>🧪 99%+ Purity</h3>Third-party HPLC tested
          </div>
          <div>
            <h3>🩺 Vet-Consult</h3>Screening before protocols
          </div>
          <div>
            <h3>❄️ Cold-Chain</h3>Insulated shipping
          </div>
          <div>
            <h3>📄 COA Library</h3>Every batch published
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w">
          <h2>Shop by goal</h2>
          <p>Choose a goal — we&apos;ll match the protocol.</p>
          <div className="grid">
            {GOALS.map((g) => (
              <a className="goal" href="/shop" key={g.i}>
                <img src={`/images/${g.i}.webp`} alt={g.g} loading="lazy" />
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
          <div>
            <b>4.9★</b>Owner rating
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w split">
          <img src="/images/lab.webp" alt="Quality control lab" loading="lazy" />
          <div>
            <span className="tag">Quality first</span>
            <h2>Every batch, independently verified</h2>
            <p>
              Each lot is HPLC- and mass-spec-tested by an independent lab before it ships.
              Certificates are published for every batch number printed on your vial.
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
              protocol is fulfilled.
            </p>
            <a className="btn" href="/contact">
              Start intake
            </a>
          </div>
          <img src="/images/vet.webp" alt="Veterinarian with dog" loading="lazy" />
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <h2>Owners & handlers love the results</h2>
          <div className="tst">
            {[
              ["t1", "Jess M.", "Agility competitor", "Recovery between trials has never been smoother. The dosing card made it easy."],
              ["t2", "Officer R. Diaz", "K9 handler", "Our patrol dog came back from a soft-tissue injury ahead of schedule, with vet oversight the whole way."],
              ["t3", "Linda K.", "Senior beagle mom", "At 13, Bella is back to her morning walks. The vet intake gave me real peace of mind."],
            ].map(([i, n, r, q]) => (
              <div className="card" key={i}>
                <img src={`/images/${i}.webp`} alt="" />
                <b>{n}</b>
                <br />
                <small>{r}</small>
                <p style={{ clear: "both", paddingTop: 10 }}>&quot;{q}&quot;</p>
                ★★★★★
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="w gal">
          {["run", "goal-performance", "rehab", "goal-joint", "t1", "goal-senior"].map((i) => (
            <img key={i} src={`/images/${i}.webp`} alt="" loading="lazy" />
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
      <section className="sec">
        <div className="w">
          <Disclaimer />
        </div>
      </section>
      <Footer />
    </>
  );
}
