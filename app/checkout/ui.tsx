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

export function CheckoutForm({ email: initialEmail }: { email: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [email, setEmail] = useState(initialEmail);
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("CA");
  const [methods, setMethods] = useState<Array<{ id: string; name: string; cents: number }>>([]);
  const [methodId, setMethodId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [vet, setVet] = useState(false);

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
      .then((data) => setLines(data.lines ?? []));
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
      setMethodId(q.methods[0]?.id ?? "");
    });
  }, [country, state, subtotal]);

  const shipping = methods.find((m) => m.id === methodId)?.cents ?? 0;

  return (
    <form
      className="pd"
      style={{ marginTop: 24 }}
      onSubmit={async (e) => {
        e.preventDefault();
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
        });
        setBusy(false);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        localStorage.removeItem("k9_cart");
        window.dispatchEvent(new Event("k9-cart"));
        window.location.href = `/checkout/success?order=${result.number}`;
      }}
    >
      <div>
        <h2>Contact & shipping</h2>
        <input name="firstName" placeholder="First name" required autoComplete="given-name" />
        <input name="lastName" placeholder="Last name" required autoComplete="family-name" />
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input name="phone" type="tel" placeholder="Phone" required autoComplete="tel" />
        <label>
          Preferred contact method
          <select name="contactMethod" defaultValue="email">
            <option value="email">Email</option>
            <option value="phone">Phone call</option>
            <option value="text">Text message</option>
          </select>
        </label>
        <input name="line1" placeholder="Address" required autoComplete="address-line1" />
        <input name="line2" placeholder="Apartment, suite (optional)" autoComplete="address-line2" />
        <input name="city" placeholder="City" required autoComplete="address-level2" />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          {STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input name="postalCode" placeholder="ZIP / Postal code" required autoComplete="postal-code" />
        <h2>Your dog (optional)</h2>
        <input name="dogName" placeholder="Dog name" />
        <input name="dogWeight" placeholder="Weight (e.g. 48 lb)" />
        <textarea name="note" rows={3} placeholder="Notes for the team (optional)" />
        <label>
          <input
            type="checkbox"
            style={{ width: "auto" }}
            checked={vet}
            onChange={(e) => setVet(e.target.checked)}
          />{" "}
          I confirm a veterinarian will supervise use and products are for research/vet-guided use.
        </label>
      </div>
      <div className="card" style={{ padding: 24, alignSelf: "start" }}>
        <h3>Request summary</h3>
        <p style={{ fontSize: 14 }}>
          No payment is collected now. After you submit, we follow up to confirm the items and
          arrange payment. Crypto checkout can be added later; this request is the live path today.
        </p>
        {lines.length ? (
          <ul style={{ paddingLeft: 18, fontSize: 14 }}>
            {lines.map((l) => (
              <li key={`${l.productId}-${l.variantId ?? ""}`}>
                {l.name ?? l.productId} ×{l.quantity} — {formatMoney((l.unitPriceCents ?? 0) * l.quantity)}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: 14 }}>Your cart is empty.</p>
        )}
        {methods.map((m) => (
          <label key={m.id}>
            <input
              type="radio"
              name="method"
              checked={methodId === m.id}
              onChange={() => setMethodId(m.id)}
              style={{ width: "auto" }}
            />{" "}
            {m.name} — {m.cents === 0 ? "FREE" : formatMoney(m.cents)}
          </label>
        ))}
        <p>
          Subtotal {formatMoney(subtotal)}
          <br />
          Shipping estimate {formatMoney(shipping)}
          <br />
          <span className="price">Estimated total {formatMoney(subtotal + shipping)}</span>
        </p>
        {error ? <p className="disc">{error}</p> : null}
        <button className="btn" type="submit" disabled={busy || !lines.length} style={{ width: "100%" }}>
          {busy ? "Sending request…" : "Request Order"}
        </button>
      </div>
    </form>
  );
}
