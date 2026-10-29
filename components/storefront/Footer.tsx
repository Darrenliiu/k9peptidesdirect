import Script from "next/script";
import { navTopProducts } from "@/lib/nav-catalog";
import { Logo } from "./Logo";
import { NewsletterForm, NewsletterPopup, PawPattern } from "./Newsletter";

const DISCLAIMER =
  "Important: Products are sold for research and veterinary-guided use only. Not intended to diagnose, treat, cure or prevent any disease. Always consult a licensed veterinarian before starting any peptide protocol. Statements have not been evaluated by the FDA.";

export function Footer() {
  const top = navTopProducts(4);

  return (
    <>
      <PawPattern />
      <footer>
        <div className="w">
          <div className="foot-grid">
            <div>
              <Logo light />
              <p>Research-grade peptides formulated and dosed for canine wellness. Lab-verified, vet-informed.</p>
            </div>
            <div>
              <h4>Shop</h4>
              <a href="/shop">All products</a>
              <a href="/bundles">Bundles</a>
              {top.map((p) => (
                <a key={p.slug} href={p.href}>
                  {p.name}
                </a>
              ))}
            </div>
            <div>
              <h4>Learn</h4>
              <a href="/blog">Blog</a>
              <a href="/dosing">Research Guide</a>
              <a href="/coa">COA / Lab Testing</a>
              <a href="/faq">FAQ</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/account">My Account</a>
            </div>
            <div>
              <h4>Policies</h4>
              <a href="/shipping">Shipping</a>
              <a href="/returns">Returns / Refunds</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
            <div className="nl-foot">
              <div className="nl-bg" aria-hidden="true">
                <svg className="nl-bg-art" focusable="false">
                  <rect width="100%" height="100%" fill="url(#nl-paws)" />
                </svg>
              </div>
              <h4>Stay in touch</h4>
              <p className="nl-blurb">Restocks, new products, and the occasional research note.</p>
              <NewsletterForm source="footer" id="nl-foot-email" submitLabel="Join" />
            </div>
          </div>
          <div className="foot-legal">
            <p className="foot-copy">
              © 2026 K9PeptidesDirect.com · For research & veterinary-guided use only. Not for human
              consumption. Not evaluated by the FDA.
            </p>
            <p className="foot-disc">{DISCLAIMER}</p>
          </div>
        </div>
      </footer>
      <NewsletterPopup />
      <Script src="/newsletter.js" strategy="afterInteractive" />
    </>
  );
}
