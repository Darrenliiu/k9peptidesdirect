import Script from "next/script";
import { Logo } from "./Logo";
import { NewsletterForm, NewsletterPopup, PawPattern } from "./Newsletter";

const DISCLAIMER =
  "Important: Products are sold for research and veterinary-guided use only. Not intended to diagnose, treat, cure or prevent any disease. Always consult a licensed veterinarian before starting any peptide protocol. Statements have not been evaluated by the FDA.";

export function Footer() {
  return (
    <>
      <PawPattern />
      <footer>
        <div className="w">
          <div>
            <div>
              <Logo light />
              <p>Research-grade peptides formulated and dosed for canine wellness. Lab-verified, vet-informed.</p>
            </div>
            <div>
              <h4>Shop</h4>
              <a href="/shop">All Products</a>
              <a href="/bundles">Bundles</a>
              <a href="/product/bpc-157">BPC-157</a>
            </div>
            <div>
              <h4>Learn</h4>
              <a href="/dosing">Research Guide</a>
              <a href="/faq">FAQ</a>
              <a href="/about">About</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="/contact">Contact</a>
              <a href="/faq">Shipping</a>
              <a href="/faq">Returns</a>
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
