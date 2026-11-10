import "./b.css";
import { bundles, COA_NOTE, DISCLAIMER, GOALS, PAY_METHODS, singles } from "../data";
import { MockBanner, PawMark } from "../shared";

export const metadata = { title: "Mockup B · Midnight Lab" };

export default function MockupB() {
  return (
    <div className="mb">
      <div className="mb-ticker" aria-hidden>
        <div>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              ◆ Batch COAs published &nbsp; ◆ Cold-pack shipping &nbsp; ◆ HPLC + mass spec verified &nbsp; ◆ Zelle · Cash App · Venmo · PayPal · Crypto &nbsp; ◆ Weight-based dosing card in every box &nbsp;
            </span>
          ))}
        </div>
      </div>
      <header className="mb-nav">
        <a className="mb-logo" href="/mockups/b"><PawMark size={24} color="#3d9bff" /> K9<span>/</span>PEPTIDES</a>
        <div className="mb-links" role="navigation"><a href="/shop">Catalog</a><a href="/bundles">Protocols</a><a href="/coa">COA</a><a href="/dosing">Research</a></div>
        <div className="mb-actions"><a href="/account">Sign in</a><a className="mb-cart" href="/cart">Cart · 0</a></div>
      </header>

      <section className="mb-hero">
        <div className="mb-glow" aria-hidden />
        <p className="mb-kicker"><span className="mb-dot" /> Research-grade canine peptides</p>
        <h1>Purity is a<br /><span>specification.</span></h1>
        <p className="mb-lede">Every lot independently tested by HPLC and mass spec. Every batch number traceable to a published certificate.</p>
        <div className="mb-cta"><a className="mb-btn" href="/shop">Explore catalog</a><a className="mb-btn line" href="/coa">See the data</a></div>
        <div className="mb-vials">
          {singles.slice(0, 5).map((p, i) => (
            <a href={p.href} key={p.id} className={`mb-vial v${i}`}>
              <img src={p.image} alt={p.name} width={400} height={400} />
            </a>
          ))}
        </div>
      </section>

      <section className="mb-sec">
        <div className="mb-head"><p className="mb-kicker">01 — Best sellers</p><h2>The catalog.</h2><a href="/shop">View all →</a></div>
        <div className="mb-grid">
          {singles.map((p, i) => (
            <a className="mb-card" href={p.href} key={p.id}>
              <span className="mb-rank">#{i + 1}</span>
              <div className="mb-card-img"><img src={p.image} alt={p.name} width={512} height={512} loading="lazy" /></div>
              <div className="mb-card-body">
                <div className="mb-card-top"><h3>{p.name}</h3><b>{p.price}</b></div>
                <p>{p.shortDescription}</p>
                <div className="mb-specline">
                  <span>{p.category}</span>
                  <span className="mb-pure">{p.purity ? `HPLC ${p.purity}` : "Identity verified"}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-sec mb-proof">
        <div className="mb-head"><p className="mb-kicker">02 — Verification</p><h2>Not a claim.<br />A certificate.</h2></div>
        <div className="mb-proof-grid">
          <div className="mb-coa">
            <div className="mb-coa-head"><span>CERTIFICATE OF ANALYSIS</span><span>LOT K9-2610</span></div>
            <div className="mb-coa-name">BPC-157 · 5 mg</div>
            <div className="mb-chart" aria-hidden>
              <svg viewBox="0 0 400 140" preserveAspectRatio="none">
                <polyline fill="none" stroke="#3d9bff" strokeWidth="2" points="0,130 60,129 90,128 120,127 140,124 150,40 158,8 166,60 175,124 200,127 260,128 300,126 310,118 318,126 400,129" />
              </svg>
            </div>
            <div className="mb-coa-rows">
              <div><span>Purity (HPLC)</span><b>99.2%</b></div>
              <div><span>Identity (MS)</span><b>Verified</b></div>
              <div><span>Testing lab</span><b>Independent third party</b></div>
            </div>
            <p className="mb-fine">Illustrative layout. Real certificates live in the COA library. {COA_NOTE}</p>
          </div>
          <div className="mb-proof-list">
            {[
              ["HPLC", "Purity measured on every tested lot, published as a percentage."],
              ["MASS SPEC", "Molecular identity confirmed before release."],
              ["BATCH TRACE", "The lot number on your vial maps to its certificate."],
              ["COLD CHAIN", "Insulated cold-pack packaging on every order."],
            ].map(([k, v]) => (
              <div key={k}><b>{k}</b><span>{v}</span></div>
            ))}
            <a className="mb-btn" href="/coa">Search COA library</a>
          </div>
        </div>
      </section>

      <section className="mb-sec">
        <div className="mb-head"><p className="mb-kicker">03 — Protocols</p><h2>Built as stacks.</h2><a href="/bundles">All bundles →</a></div>
        <div className="mb-bundles">
          {bundles.slice(0, 5).map((b, i) => (
            <a className={`mb-bundle ${i === 0 ? "big" : ""}`} href={b.href} key={b.id}>
              <img src={b.image} alt={b.name} width={512} height={512} loading="lazy" />
              <div>
                <p className="mb-kicker">{b.includes.join(" + ")}</p>
                <h3>{b.name}</h3>
                <b>{b.price}</b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-sec mb-goals">
        <div className="mb-head"><p className="mb-kicker">04 — By goal</p><h2>Pick a pathway.</h2></div>
        <div className="mb-goal-list">
          {GOALS.map((g, i) => (
            <a href={g.href} key={g.i} className="mb-goal">
              <span className="mb-gi">0{i + 1}</span>
              <span className="mb-gt">{g.g}</span>
              <span className="mb-gd">{g.d}</span>
              <img src={`/images/${g.i}.webp`} alt="" width={576} height={432} loading="lazy" />
              <span className="mb-ga">→</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="mb-foot">
        <div className="mb-foot-grid">
          <div><p className="mb-kicker">K9 Peptides Direct</p><p>Research-grade peptides formulated and dosed for canine wellness.</p><div className="mb-pay">{PAY_METHODS.map((m) => <span key={m}>{m}</span>)}</div></div>
          <div><a href="/shop">Catalog</a><a href="/bundles">Bundles</a><a href="/coa">COA library</a><a href="/dosing">Research guide</a></div>
          <div><a href="/faq">FAQ</a><a href="/blog">Blog</a><a href="/about">About</a><a href="/contact">Contact</a></div>
          <div><a href="/shipping">Shipping</a><a href="/returns">Returns</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
        <div className="mb-word" aria-hidden>K9 PEPTIDES</div>
        <p className="mb-disc">{DISCLAIMER} © 2026 K9PeptidesDirect.com</p>
      </footer>
      <MockBanner label="B · Midnight Lab" />
    </div>
  );
}
