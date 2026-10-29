import { Logo } from "./Logo";

export function Footer() {
  return (
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
            <a href="/shop#packages">Packages</a>
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
        </div>
        <p style={{ marginTop: 30, fontSize: 12, opacity: 0.7 }}>
          © 2026 K9PeptidesDirect.com · For research & veterinary-guided use only. Not for human
          consumption. Not evaluated by the FDA.
        </p>
      </div>
    </footer>
  );
}
