"use client";

import { useEffect, useState } from "react";
import { checkoutAction, quoteAction } from "@/app/actions/checkout";
import { formatMoney } from "@/lib/money";

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA",
  "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK",
  "OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

type Line = {
  productId: string;
  variantId?: string;
  quantity: number;
  subscribe?: boolean;
  name?: string;
  unitPriceCents?: number;
};

type PayId = "zelle" | "cashapp" | "venmo" | "paypal" | "crypto";

const PAY: Array<{ id: PayId; label: string; color: string; glyph: string; how: string }> = [
  { id: "zelle", label: "Zelle", color: "#6d1ed4", glyph: "Z",
    how: "After you place the order, Peer Pay's secure checkout opens on Zelle with the exact amount and recipient. Send it from your bank's Zelle, then return to confirm." },
  { id: "cashapp", label: "Cash App", color: "#00c244", glyph: "$",
    how: "After you place the order, Peer Pay's secure checkout opens on Cash App with the exact amount and $cashtag. Pay from your Cash App balance, then return to confirm." },
  { id: "venmo", label: "Venmo", color: "#008cff", glyph: "V",
    how: "After you place the order, Peer Pay's secure checkout opens on Venmo with the exact amount and recipient. Send as friends & family from your Venmo balance, then return to confirm." },
  { id: "paypal", label: "PayPal", color: "#003087", glyph: "P",
    how: "After you place the order, Peer Pay's secure checkout opens on PayPal with the exact amount and recipient. Send from your PayPal balance, then return to confirm." },
  { id: "crypto", label: "Crypto", color: "#1a1f36", glyph: "◎",
    how: "After you place the order, Peer Pay's secure checkout opens where you pick a wallet, coin and network (USDC, ETH, SOL and more) and pay the exact amount." },
];

function Icon({ p }: { p: (typeof PAY)[number] }) {
  return (
    <span className="co-ico" style={{ background: p.color }} aria-hidden>
      {p.glyph}
    </span>
  );
}

export function CheckoutForm({ email: initialEmail, payNow = false }: { email: string; payNow?: boolean }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("CA");
  const [methods, setMethods] = useState<Array<{ id: string; name: string; cents: number }>>([]);
  const [methodId, setMethodId] = useState("");
  const [pay, setPay] = useState<PayId>("zelle");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [vet, setVet] = useState(false);
  const [terms, setTerms] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [open, setOpen] = useState(false);

  const subtotal = lines.reduce((n, l) => n + (l.unitPriceCents ?? 0) * l.quantity, 0);

  useEffect(() => {
    const raw = localStorage.getItem("k9_cart");
    const cart = raw ? (JSON.parse(raw) as Line[]) : [];
    fetch("/api/cart/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: cart }),
    })
      .then((r) => r.json())
      .then((data) => setLines(data.lines ?? []))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!subtotal) return;
    quoteAction({ country, state, subtotalCents: subtotal }).then((q) => {
      if (!q.ok) {
        setMethods([]);
        setError(q.error);
        return;
      }
      setError("");
      setMethods(q.methods);
      setMethodId((cur) => (q.methods.some((m) => m.id === cur) ? cur : q.methods[0]?.id ?? ""));
    });
  }, [country, state, subtotal]);

  const shipping = methods.find((m) => m.id === methodId)?.cents ?? 0;
  const total = subtotal + shipping;
  const current = PAY.find((p) => p.id === pay)!;
  const ready = lines.length > 0 && vet && terms && !!methodId;

  const summary = (
    <>
      {lines.length ? (
        <ul className="co-lines">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.variantId ?? ""}`}>
              <span className="co-qty">{l.quantity}</span>
              <span className="co-name">
                {l.name ?? l.productId}
                {l.subscribe ? <small>Autoship</small> : null}
              </span>
              <span>{formatMoney((l.unitPriceCents ?? 0) * l.quantity)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="co-muted">{loaded ? "Your cart is empty." : "Loading your cart…"}</p>
      )}
      <div className="co-promo">
        <input
          placeholder="Promo code"
          value={promo}
          onChange={(e) => {
            setPromo(e.target.value);
            setPromoMsg("");
          }}
          aria-label="Promo code"
        />
        <button
          type="button"
          className="co-btn2"
          disabled={!promo.trim()}
          onClick={() => setPromoMsg("Promo codes aren't available yet.")}
        >
          Apply
        </button>
      </div>
      {promoMsg ? <p className="co-muted co-small">{promoMsg}</p> : null}
      <dl className="co-totals">
        <dt>Subtotal</dt>
        <dd>{formatMoney(subtotal)}</dd>
        <dt>Shipping</dt>
        <dd>{methodId ? (shipping === 0 ? "FREE" : formatMoney(shipping)) : "—"}</dd>
        <dt className="co-grand">Total</dt>
        <dd className="co-grand">{formatMoney(total)}</dd>
      </dl>
    </>
  );

  return (
    <form
      className="co-grid"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ready) {
          setError("Please confirm both acknowledgements to continue.");
          return;
        }
        const fd = new FormData(e.currentTarget);
        setBusy(true);
        setError("");
        const result = await checkoutAction({
          email,
          lines: lines.map((l) => ({
            productId: l.productId,
            variantId: l.variantId,
            quantity: l.quantity,
            subscribe: l.subscribe,
          })),
          shipping: {
            firstName: String(fd.get("firstName") || ""),
            lastName: String(fd.get("lastName") || ""),
            line1: String(fd.get("line1") || ""),
            line2: String(fd.get("line2") || ""),
            city: String(fd.get("city") || ""),
            state,
            postalCode: String(fd.get("postalCode") || ""),
            country,
            phone: String(fd.get("phone") || ""),
          },
          shippingMethodId: methodId,
          customerNote: String(fd.get("note") || ""),
          dogName: String(fd.get("dogName") || ""),
          dogWeight: String(fd.get("dogWeight") || ""),
          contactMethod: String(fd.get("contactMethod") || "email") as "email" | "phone" | "text",
          vetConfirmed: vet,
          paymentMethod: payNow ? pay : undefined,
        });
        setBusy(false);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        localStorage.removeItem("k9_cart");
        window.dispatchEvent(new Event("k9-cart"));
        if (result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
          return;
        }
        window.location.href = `/checkout/success?order=${result.number}`;
      }}
    >
      <div className="co-mobile-sum">
        <button type="button" className="co-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>{open ? "Hide" : "Show"} order summary</span>
          <b>{formatMoney(total)}</b>
        </button>
        {open ? <div className="co-card">{summary}</div> : null}
      </div>

      <div className="co-main">
        <fieldset className="co-card">
          <legend><span className="co-step">1</span> Contact &amp; shipping address</legend>
          <div className="co-row">
            <label>First name<input name="firstName" required autoComplete="given-name" /></label>
            <label>Last name<input name="lastName" required autoComplete="family-name" /></label>
          </div>
          <div className="co-row">
            <label>Email<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>Phone<input name="phone" type="tel" required autoComplete="tel" /></label>
          </div>
          <label>Street address<input name="line1" required autoComplete="address-line1" placeholder="House number and street name" /></label>
          <label>Apartment, suite (optional)<input name="line2" autoComplete="address-line2" /></label>
          <div className="co-row co-row3">
            <label>City<input name="city" required autoComplete="address-level2" /></label>
            <label>State
              <select value={state} onChange={(e) => setState(e.target.value)}>
                {STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>ZIP<input name="postalCode" required autoComplete="postal-code" /></label>
          </div>
          <div className="co-row">
            <label>Country
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </label>
            <label>Preferred contact
              <select name="contactMethod" defaultValue="email">
                <option value="email">Email</option>
                <option value="phone">Phone call</option>
                <option value="text">Text message</option>
              </select>
            </label>
          </div>
          <details className="co-more">
            <summary>Add dog details or a note (optional)</summary>
            <div className="co-row">
              <label>Dog name<input name="dogName" /></label>
              <label>Weight<input name="dogWeight" placeholder="e.g. 48 lb" /></label>
            </div>
            <label>Notes for the team<textarea name="note" rows={3} /></label>
          </details>
        </fieldset>

        <fieldset className="co-card">
          <legend><span className="co-step">2</span> Shipping method</legend>
          {methods.length ? (
            <div className="co-radios">
              {methods.map((m) => (
                <label key={m.id} className={`co-radio ${methodId === m.id ? "on" : ""}`}>
                  <input type="radio" name="ship" checked={methodId === m.id} onChange={() => setMethodId(m.id)} />
                  <span>{m.name}</span>
                  <b>{m.cents === 0 ? "FREE" : formatMoney(m.cents)}</b>
                </label>
              ))}
            </div>
          ) : (
            <p className="co-muted">{lines.length ? "Calculating shipping…" : "Add items to see shipping options."}</p>
          )}
        </fieldset>

        {payNow ? (
          <fieldset className="co-card">
            <legend><span className="co-step">3</span> Payment</legend>
            <div className="co-tabs" role="radiogroup" aria-label="Payment method">
              {PAY.map((p) => (
                <label key={p.id} className={`co-tab ${pay === p.id ? "on" : ""}`}>
                  <input type="radio" name="pay" value={p.id} checked={pay === p.id} onChange={() => setPay(p.id)} />
                  <Icon p={p} />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
            <div className="co-how">
              <b>How {current.label} works</b>
              <p>{current.how}</p>
              <p className="co-small co-muted">
                Payments are processed by Peer Pay. Nothing is charged automatically; you send the
                payment yourself. Your order is confirmed once the payment settles.
              </p>
            </div>
          </fieldset>
        ) : (
          <fieldset className="co-card">
            <legend><span className="co-step">3</span> Payment</legend>
            <p className="co-muted">No payment is taken on this page. Our team will follow up to confirm the order and arrange payment.</p>
          </fieldset>
        )}

        <div className="co-card co-ack">
          <label className="co-check">
            <input type="checkbox" checked={vet} onChange={(e) => setVet(e.target.checked)} />
            <span>
              I understand products are sold for research and veterinary-guided use only, are not
              intended to diagnose, treat, cure or prevent any disease, and I will consult a licensed
              veterinarian before use.
            </span>
          </label>
          <label className="co-check">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>
              I have read and agree to the <a href="/terms" target="_blank">terms</a>,{" "}
              <a href="/shipping" target="_blank">shipping</a> and <a href="/returns" target="_blank">returns</a> policies.
            </span>
          </label>
          {error ? <p className="co-err" role="alert">{error}</p> : null}
          <button className="co-cta" type="submit" disabled={busy || !lines.length}>
            {busy
              ? payNow ? "Opening secure checkout…" : "Sending request…"
              : payNow ? `Place order — pay with ${current.label}` : "Request order"}
            {!busy && lines.length ? <span>{formatMoney(total)}</span> : null}
          </button>
          {payNow ? (
            <p className="co-small co-muted co-center">You&apos;ll finish on Peer Pay&apos;s secure checkout, opened on {current.label}.</p>
          ) : null}
        </div>
      </div>

      <aside className="co-side">
        <div className="co-card co-sticky">
          <h2>Order summary</h2>
          {summary}
        </div>
      </aside>
    </form>
  );
}
