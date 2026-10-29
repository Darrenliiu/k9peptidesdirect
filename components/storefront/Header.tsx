"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

function cartCount() {
  try {
    const raw = localStorage.getItem("k9_cart");
    const items = raw ? (JSON.parse(raw) as Array<{ quantity?: number }>) : [];
    return items.reduce((n, i) => n + Math.max(0, i.quantity ?? 0), 0);
  } catch {
    return 0;
  }
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount());
    sync();
    window.addEventListener("k9-cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("k9-cart", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <>
      <div className="bar">
        Free cold-pack shipping $150+
        <span className="dk"> · Third-party tested · Vet-consult support</span>
      </div>
      <header>
        <div className="w">
          <Logo />
          <nav>
            <a href="/shop">Shop</a>
            <a href="/bundles">Bundles</a>
            <a href="/blog">Blog</a>
            <a href="/dosing">Research Guide</a>
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
            <a href="/account">Account</a>
          </nav>
          <div className="hr">
            <a
              className="btn n cartb"
              href="/cart"
              aria-label={count ? `Cart, ${count} items` : "Cart"}
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2.5 3h2.6l2.4 12h11l2-8H6.3" />
              </svg>
              <span className="ct">Cart</span>
              {count > 0 ? <span className="badge">{count}</span> : null}
            </a>
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v);
                document.body.classList.toggle("nav-open");
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
