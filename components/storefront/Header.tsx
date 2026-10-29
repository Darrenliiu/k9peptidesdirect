"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MEGA_FEATURE, navBundles, navPeptides } from "@/lib/nav-catalog";
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

function UserIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2c.8-3.2 3.4-5.2 7-5.2s6.2 2 7 5.2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2.6l2.4 12h11l2-8H6.3" />
    </svg>
  );
}

export function Header() {
  const peptides = navPeptides();
  const bundles = navBundles();
  const megaId = useId();
  const shopRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShop, setMobileShop] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount());
    sync();
    window.addEventListener("k9-cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("k9-cart", sync);
      window.removeEventListener("storage", sync);
      document.body.classList.remove("nav-open");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
  }, [menuOpen]);

  function clearClose() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openShop() {
    clearClose();
    setShopOpen(true);
  }

  function scheduleClose() {
    clearClose();
    closeTimer.current = window.setTimeout(() => setShopOpen(false), 140);
  }

  function closeShop() {
    clearClose();
    setShopOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((v) => {
      const next = !v;
      if (!next) setMobileShop(false);
      return next;
    });
    closeShop();
  }

  useEffect(() => {
    if (!shopOpen && !menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeShop();
        setMenuOpen(false);
        setMobileShop(false);
      }
    }
    function onPointer(e: MouseEvent) {
      const t = e.target as Node;
      if (shopRef.current && !shopRef.current.contains(t)) closeShop();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [shopOpen, menuOpen]);

  return (
    <>
      <div className="bar">
        Free cold-pack shipping $150+
        <span className="dk"> · Third-party tested · Vet-consult support</span>
      </div>
      <header>
        <div className="w">
          <Logo />
          <nav id="site-nav" aria-label="Primary">
            <div
              className={`shop-nav desk-only${shopOpen ? " on" : ""}`}
              ref={shopRef}
              onMouseEnter={openShop}
              onMouseLeave={scheduleClose}
            >
              <button
                className="nav-link shop-btn"
                type="button"
                aria-expanded={shopOpen}
                aria-controls={megaId}
                aria-haspopup="true"
                onClick={() => setShopOpen((v) => !v)}
                onFocus={openShop}
              >
                Shop
                <span className="chev" aria-hidden />
              </button>
              <div
                id={megaId}
                className={`shop-mega${shopOpen ? " open" : ""}`}
                aria-hidden={!shopOpen}
                inert={shopOpen ? undefined : true}
                onFocus={openShop}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                }}
              >
                <div className="w mega-inner">
                  <div>
                    <h3>Peptides</h3>
                    <ul>
                      {peptides.map((p) => (
                        <li key={p.slug}>
                          <a href={p.href}>{p.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Bundles</h3>
                    <ul>
                      {bundles.map((p) => (
                        <li key={p.slug}>
                          <a href={p.href}>{p.name}</a>
                        </li>
                      ))}
                      <li>
                        <a className="mega-more" href="/bundles">
                          View all bundles
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a className="mega-feature" href="/shop">
                    <img src={MEGA_FEATURE.image} alt={MEGA_FEATURE.alt} width={480} height={320} />
                    <span>
                      <strong>{MEGA_FEATURE.title}</strong>
                      {MEGA_FEATURE.text}
                      <em>{MEGA_FEATURE.cta}</em>
                    </span>
                  </a>
                  <p className="mega-extra">
                    <a href="/coa">Lab-tested (COA)</a>
                  </p>
                </div>
              </div>
            </div>
            <a className="nav-link desk-only" href="/dosing">
              Research Guide
            </a>
            <a className="nav-link desk-only" href="/coa">
              COA
            </a>
            <a className="nav-link desk-only" href="/blog">
              Blog
            </a>
            <a className="nav-link desk-only" href="/about">
              About
            </a>

            <div className="mob-extra">
              <button
                className="nav-link shop-acc"
                type="button"
                aria-expanded={mobileShop}
                onClick={() => setMobileShop((v) => !v)}
              >
                Shop
                <span className="chev" aria-hidden />
              </button>
              {mobileShop ? (
                <div className="mob-shop">
                  <p>Peptides</p>
                  {peptides.map((p) => (
                    <a key={p.slug} href={p.href}>
                      {p.name}
                    </a>
                  ))}
                  <p>Bundles</p>
                  {bundles.map((p) => (
                    <a key={p.slug} href={p.href}>
                      {p.name}
                    </a>
                  ))}
                  <a href="/shop">Shop all</a>
                  <a href="/bundles">View all bundles</a>
                </div>
              ) : null}
              <a className="nav-link" href="/dosing">
                Research Guide
              </a>
              <a className="nav-link" href="/coa">
                COA
              </a>
              <a className="nav-link" href="/blog">
                Blog
              </a>
              <a className="nav-link" href="/about">
                About
              </a>
              <a className="nav-link" href="/faq">
                FAQ
              </a>
              <a className="nav-link" href="/contact">
                Contact
              </a>
              <a className="nav-link" href="/account">
                Account
              </a>
            </div>
          </nav>
          <div className="hr">
            <a className="iconb" href="/account" aria-label="Account">
              <UserIcon />
            </a>
            <a className="btn n cartb" href="/cart" aria-label={count ? `Cart, ${count} items` : "Cart"}>
              <CartIcon />
              <span className="ct">Cart</span>
              {count > 0 ? <span className="badge">{count}</span> : null}
            </a>
            <button className="burger" type="button" aria-label="Menu" aria-expanded={menuOpen} aria-controls="site-nav" onClick={toggleMenu}>
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
