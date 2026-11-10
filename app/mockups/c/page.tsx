import "./c.css";
import { bundles, COA_NOTE, DISCLAIMER, FAQ, featured, GOALS, PAY_METHODS } from "../data";
import { MockBanner, PawMark } from "../shared";

export const metadata = { title: "Mockup C · Pack Life" };

const TONES = ["sky", "sage", "sand", "dusk"] as const;

export default function MockupC() {
  return (
    <div className="mc">
      <div className="mc-bar"><PawMark size={13} /> Cold-pack shipping on every order · COAs published for every batch</div>
      <header className="mc-nav">
        <div className="mc-links" role="navigation"><a href="/shop">Shop</a><a href="/bundles">Bundles</a><a href="/coa">Lab reports</a></div>
        <a className="mc-logo" href="/mockups/c"><span><PawMark size={22} color="#fff" /></span>K9 Peptides Direct</a>
        <div className="mc-actions"><a href="/dosing">Research guide</a><a className="mc-cart" href="/cart">Cart</a></div>
      </header>

      <section className="mc-hero">
        <img className="mc-hero-bg" src="/images/run.webp" alt="Dog running on a beach at sunset" width={1280} height={720} />
        <div className="mc-hero-inner">
          <p className="mc-eyebrow">For the dogs who give everything</p>
          <h1>Keep them<br /><em>moving</em> forward.</h1>
          <p>Research-grade peptide protocols for recovery, mobility, longevity and performance, dosed by your dog&apos;s weight and backed by published lab results.</p>
          <div className="mc-cta"><a className="mc-btn" href="/shop">Find their protocol</a><a className="mc-btn soft" href="/coa">How we test</a></div>
        </div>
        <div className="mc-hero-badges">
          <span>🧪 Third-party HPLC tested</span><span>❄️ Cold-pack shipping</span><span>📄 Batch COAs</span>
        </div>
      </section>

      <section className="mc-sec">
        <div className="mc-head"><p className="mc-eyebrow">Shop by goal</p><h2>What does your dog <em>need</em> most?</h2></div>
        <div className="mc-goals">
          {GOALS.map((g, i) => (
            <a className={`mc-goal ${TONES[i]}`} href={g.href} key={g.i}>
              <div className="mc-goal-copy"><h3>{g.g}</h3><p>{g.d}</p><span className="mc-arrow">Explore →</span></div>
              <img src={`/images/${g.i}.webp`} alt={g.g} width={576} height={432} loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <section className="mc-sec mc-cream">
        <div className="mc-head row"><div><p className="mc-eyebrow">Favorites</p><h2>Single vials</h2></div><a className="mc-link" href="/shop">Shop all →</a></div>
        <div className="mc-products">
          {featured.map((p, i) => (
            <a className="mc-card" href={p.href} key={p.id}>
              <div className={`mc-card-img ${TONES[i % 4]}`}><img src={p.image} alt={p.name} width={512} height={512} loading="lazy" /></div>
              <div className="mc-card-b">
                <span className="mc-tag">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.shortDescription}</p>
                <div className="mc-card-f"><b>{p.price}</b><span className="mc-plus">+</span></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mc-sec">
        <div className="mc-bento">
          <a className="mc-b1" href={bundles[0].href}>
            <img src={bundles[0].image} alt={bundles[0].name} width={600} height={600} loading="lazy" />
            <div><p className="mc-eyebrow">Most complete</p><h3>{bundles[0].name}</h3><p>{bundles[0].includes.join(" + ")}</p><b>{bundles[0].price}</b></div>
          </a>
          {bundles.slice(1, 5).map((b) => (
            <a className="mc-bx" href={b.href} key={b.id}>
              <img src={b.image} alt={b.name} width={300} height={300} loading="lazy" />
              <div><h3>{b.name}</h3><p>{b.includes.join(" + ")}</p><b>{b.price}</b></div>
            </a>
          ))}
          <div className="mc-bq">
            <PawMark size={34} color="#fff" />
            <h3>Protocol bundles</h3>
            <p>Pre-matched vials for a single goal, each with a weight-based dosing card.</p>
            <a className="mc-btn light" href="/bundles">See all bundles</a>
          </div>
        </div>
      </section>

      <section className="mc-trust">
        <div className="mc-trust-img"><img src="/images/lab.webp" alt="Quality-control laboratory" width={1280} height={720} loading="lazy" /></div>
        <div className="mc-trust-copy">
          <p className="mc-eyebrow">Peace of mind</p>
          <h2>Tested by a lab, <em>not just trusted.</em></h2>
          <ul>
            <li><b>Independent testing</b><span>Each lot is HPLC and mass-spec tested before it ships.</span></li>
            <li><b>Traceable batches</b><span>The lot number on your vial matches a certificate in our COA library.</span></li>
            <li><b>Shipped cold</b><span>Insulated cold-pack packaging on every order.</span></li>
          </ul>
          <p className="mc-small">{COA_NOTE}</p>
          <a className="mc-btn" href="/coa">Browse COAs</a>
        </div>
      </section>

      <section className="mc-sec mc-how">
        <div className="mc-head center"><p className="mc-eyebrow">How it works</p><h2>Three simple <em>steps</em></h2></div>
        <div className="mc-steps">
          {[
            ["Pick a goal", "Mobility, recovery, longevity or performance. Start with a single vial or a bundle."],
            ["Talk to your vet", "Review the research guide together. Always follow your veterinarian's direction."],
            ["Dose by weight", "Every vial ships with a weight-based dosing card for small, medium and large dogs."],
          ].map(([t, d], i) => (
            <div className="mc-step" key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mc-sec mc-cream mc-faq">
        <div><p className="mc-eyebrow">Questions</p><h2>Good to <em>know</em></h2><img src="/images/goal-senior.webp" alt="Senior dog resting" width={576} height={432} loading="lazy" /></div>
        <div>{FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </section>

      <footer className="mc-foot">
        <div className="mc-foot-top">
          <a className="mc-logo" href="/mockups/c"><span><PawMark size={22} color="#fff" /></span>K9 Peptides Direct</a>
          <div className="mc-pay">{PAY_METHODS.map((m) => <span key={m}>{m}</span>)}</div>
        </div>
        <div className="mc-foot-grid">
          <div><h4>Shop</h4><a href="/shop">All products</a><a href="/bundles">Bundles</a><a href="/coa">Lab reports</a></div>
          <div><h4>Learn</h4><a href="/dosing">Research guide</a><a href="/blog">Blog</a><a href="/faq">FAQ</a></div>
          <div><h4>Company</h4><a href="/about">About</a><a href="/contact">Contact</a><a href="/account">Account</a></div>
          <div><h4>Policies</h4><a href="/shipping">Shipping</a><a href="/returns">Returns</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
        <p className="mc-disc">{DISCLAIMER}</p>
        <p className="mc-disc">© 2026 K9PeptidesDirect.com</p>
      </footer>
      <MockBanner label="C · Pack Life" />
    </div>
  );
}
