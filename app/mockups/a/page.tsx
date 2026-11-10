import "./a.css";
import { bundles, COA_NOTE, DISCLAIMER, FAQ, featured, GOALS, PAY_METHODS, singles } from "../data";
import { MockBanner, PawMark } from "../shared";

export const metadata = { title: "Mockup A · Clinical Luxe" };

export default function MockupA() {
  const verified = singles.filter((p) => p.purity);
  return (
    <div className="ma">
      <div className="ma-bar">Cold-pack shipping on every order · Batch COAs published · Pay with Zelle, Cash App, Venmo, PayPal or crypto</div>
      <header className="ma-nav">
        <a className="ma-logo" href="/mockups/a">
          <span className="ma-logo-mark"><PawMark size={20} color="#fff" /></span>
          K9 Peptides <em>Direct</em>
        </a>
        <div className="ma-links" role="navigation">
          <a href="/shop">Shop</a><a href="/bundles">Protocols</a><a href="/coa">Lab Reports</a><a href="/dosing">Research Guide</a><a href="/about">About</a>
        </div>
        <div className="ma-actions"><a href="/account">Account</a><a className="ma-pill" href="/cart">Cart</a></div>
      </header>

      <section className="ma-hero">
        <div className="ma-hero-copy">
          <p className="ma-eyebrow">Research-grade canine peptides</p>
          <h1>Precision you can <i>verify</i>,<br />for the dogs who give everything.</h1>
          <p className="ma-lede">Lyophilized vials and protocol bundles, dosed by canine body weight, with third-party certificates of analysis published for every batch.</p>
          <div className="ma-cta">
            <a className="ma-btn" href="/shop">Shop peptides</a>
            <a className="ma-btn ghost" href="/coa">View lab reports →</a>
          </div>
          <dl className="ma-specs">
            <div><dt>99%+</dt><dd>HPLC purity on tested lots</dd></div>
            <div><dt>Cold-pack</dt><dd>Insulated shipping</dd></div>
            <div><dt>COA</dt><dd>Per batch, searchable</dd></div>
          </dl>
        </div>
        <div className="ma-hero-art">
          <div className="ma-hero-photo"><img src="/images/hero-dog.webp" alt="Working dog outdoors" width={1280} height={720} /></div>
          <div className="ma-hero-vial">
            <img src="/images/bpc-157.webp" alt="BPC-157 vial" width={400} height={400} />
            <div><b>BPC-157</b><span>HPLC 99.2% · Mass spec verified</span></div>
          </div>
        </div>
      </section>

      <section className="ma-sec">
        <div className="ma-head">
          <h2>The <i>essentials</i></h2>
          <a href="/shop">View full catalog →</a>
        </div>
        <div className="ma-products">
          {featured.map((p) => (
            <a className="ma-card" href={p.href} key={p.id}>
              <div className="ma-card-img"><img src={p.image} alt={p.name} width={512} height={512} loading="lazy" /></div>
              <div className="ma-card-meta">
                <span>{p.category}</span>
                {p.purity ? <span className="ma-chip">HPLC {p.purity}</span> : <span className="ma-chip">Identity verified</span>}
              </div>
              <h3>{p.name}</h3>
              <p>{p.shortDescription}</p>
              <div className="ma-card-foot"><b>{p.price}</b><span>View →</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="ma-sec ma-goals">
        <div className="ma-head"><h2>Shop by <i>goal</i></h2></div>
        <div className="ma-goal-row">
          {GOALS.map((g, i) => (
            <a className="ma-goal" href={g.href} key={g.i}>
              <span className="ma-num">0{i + 1}</span>
              <img src={`/images/${g.i}.webp`} alt={g.g} width={576} height={432} loading="lazy" />
              <h3>{g.g}</h3>
              <p>{g.d}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="ma-lab">
        <div className="ma-lab-copy">
          <p className="ma-eyebrow">Quality standard</p>
          <h2>Lab-tested <i>before</i> it reaches your dog.</h2>
          <p>Each lot is HPLC- and mass-spec-tested by an independent lab. The batch number on your vial matches a certificate in our COA library.</p>
          <p className="ma-small">{COA_NOTE}</p>
          <a className="ma-btn" href="/coa">Open the COA library</a>
        </div>
        <div className="ma-lab-table">
          <div className="ma-row ma-row-h"><span>Compound</span><span>Method</span><span>Result</span></div>
          {verified.map((p) => (
            <a className="ma-row" href={p.href} key={p.id}>
              <span>{p.name}</span><span>HPLC · MS</span><span className="ma-ok">{p.purity}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="ma-sec">
        <div className="ma-head">
          <h2>Protocol <i>bundles</i></h2>
          <a href="/bundles">All bundles →</a>
        </div>
        <div className="ma-bundles">
          {bundles.slice(0, 3).map((b) => (
            <a className="ma-bundle" href={b.href} key={b.id}>
              <img src={b.image} alt={b.name} width={512} height={512} loading="lazy" />
              <div>
                <h3>{b.name}</h3>
                <p>{b.includes.join(" + ")}</p>
                <div className="ma-card-foot"><b>{b.price}</b><span>View bundle →</span></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="ma-sec ma-steps">
        <div className="ma-head"><h2>How it <i>works</i></h2></div>
        <ol>
          <li><b>Choose a goal</b><span>Browse single vials or a protocol bundle matched to recovery, mobility, longevity or performance research.</span></li>
          <li><b>Check the COA</b><span>Look up the lot in our COA library before you order. Every result is published.</span></li>
          <li><b>Dose by weight</b><span>Every vial ships with a weight-based dosing card. Always follow your veterinarian&apos;s direction.</span></li>
        </ol>
      </section>

      <section className="ma-sec ma-faq">
        <div className="ma-faq-title"><h2>You ask,<br /><i>we answer.</i></h2></div>
        <div>
          {FAQ.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      <footer className="ma-foot">
        <div className="ma-foot-grid">
          <div>
            <a className="ma-logo" href="/mockups/a"><span className="ma-logo-mark"><PawMark size={20} color="#fff" /></span>K9 Peptides <em>Direct</em></a>
            <p>Research-grade peptides formulated and dosed for canine wellness.</p>
            <div className="ma-pay">{PAY_METHODS.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          <div><h4>Shop</h4><a href="/shop">All products</a><a href="/bundles">Bundles</a><a href="/coa">Lab reports</a></div>
          <div><h4>Learn</h4><a href="/blog">Blog</a><a href="/dosing">Research guide</a><a href="/faq">FAQ</a></div>
          <div><h4>Policies</h4><a href="/shipping">Shipping</a><a href="/returns">Returns</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
        <p className="ma-disc">{DISCLAIMER}</p>
        <p className="ma-disc">© 2026 K9PeptidesDirect.com</p>
      </footer>
      <MockBanner label="A · Clinical Luxe" />
    </div>
  );
}
