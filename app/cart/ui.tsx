"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/money";

type Line = {
  productId: string;
  variantId?: string;
  quantity: number;
  subscribe?: boolean;
  name?: string;
  variantName?: string;
  unitPriceCents?: number;
  image?: string;
};

export function CartClient() {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("k9_cart");
    const cart = raw ? (JSON.parse(raw) as Line[]) : [];
    fetch("/api/cart/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: cart }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        setLines(data.lines ?? []);
        setReady(true);
      })
      .catch(() => {
        setError("Could not load cart prices.");
        setReady(true);
      });
  }, []);

  const subtotal = lines.reduce((n, l) => n + (l.unitPriceCents ?? 0) * l.quantity, 0);
  const shipping = subtotal >= 15000 ? 0 : 1295;

  function updateQty(i: number, qty: number) {
    const next = [...lines];
    if (qty < 1) next.splice(i, 1);
    else next[i] = { ...next[i], quantity: qty };
    setLines(next);
    localStorage.setItem(
      "k9_cart",
      JSON.stringify(
        next.map((l) => ({
          productId: l.productId,
          variantId: l.variantId,
          quantity: l.quantity,
          subscribe: l.subscribe,
        })),
      ),
    );
    window.dispatchEvent(new Event("k9-cart"));
  }

  return (
    <section className="sec">
      <div className="w pd">
        <div>
          <h2>Your cart</h2>
          {!ready ? <p>Loading cart…</p> : null}
          {error ? <p className="disc">{error}</p> : null}
          {ready && !lines.length ? (
            <p>
              Your cart is empty. <a href="/shop">Continue shopping</a>.
            </p>
          ) : null}
          {lines.length ? (
            <div className="tw">
              <table>
                <tbody>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                  {lines.map((l, i) => (
                    <tr key={`${l.productId}-${l.variantId}-${i}`}>
                      <td>
                        {l.name}
                        {l.variantName ? ` · ${l.variantName}` : ""}
                        {l.subscribe ? " · Subscribe" : ""}
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          value={l.quantity}
                          style={{ width: 72, minHeight: 44 }}
                          onChange={(e) => updateQty(i, Number(e.target.value))}
                        />
                      </td>
                      <td>{formatMoney((l.unitPriceCents ?? 0) * l.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
        <div className="card" style={{ padding: 24, alignSelf: "start" }}>
          <h3>Order summary</h3>
          <p>
            Subtotal {formatMoney(subtotal)}
            <br />
            Cold-pack shipping <b>{shipping === 0 && subtotal > 0 ? "FREE" : formatMoney(shipping)}</b>
            <br />
            <span className="price">Total {formatMoney(subtotal + (lines.length ? shipping : 0))}</span>
          </p>
          <a className="btn" href="/checkout" style={{ width: "100%", textAlign: "center" }}>
            Continue to request order
          </a>
        </div>
      </div>
    </section>
  );
}
