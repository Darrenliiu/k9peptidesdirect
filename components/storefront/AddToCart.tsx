"use client";

import { useState } from "react";
type CartProduct = {
  id: string;
  salePriceCents?: number | null;
  priceCents: number;
  variants: Array<{ id: string; name: string }>;
};

export function addToCart(item: {
  productId: string;
  variantId?: string;
  quantity: number;
  subscribe?: boolean;
}) {
  const raw = localStorage.getItem("k9_cart");
  const cart = raw
    ? (JSON.parse(raw) as Array<{
        productId: string;
        variantId?: string;
        quantity: number;
        subscribe?: boolean;
      }>)
    : [];
  const idx = cart.findIndex(
    (l) =>
      l.productId === item.productId &&
      l.variantId === item.variantId &&
      Boolean(l.subscribe) === Boolean(item.subscribe),
  );
  if (idx >= 0) cart[idx].quantity += item.quantity;
  else cart.push(item);
  localStorage.setItem("k9_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("k9-cart"));
}

export function AddToCart({ product }: { product: CartProduct }) {
  const [variantId, setVariantId] = useState(product.variants[1]?.id ?? product.variants[0]?.id ?? "");
  const [subscribe, setSubscribe] = useState(false);
  const [added, setAdded] = useState(false);
  const price = product.salePriceCents ?? product.priceCents;
  const sub = Math.round(price * 0.85);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addToCart({ productId: product.id, variantId, quantity: 1, subscribe });
        setAdded(true);
        setTimeout(() => {
          window.location.href = "/cart";
        }, 250);
      }}
    >
      <label htmlFor="weight">Dog weight</label>
      <select
        id="weight"
        value={variantId}
        onChange={(e) => setVariantId(e.target.value)}
      >
        {product.variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      <label htmlFor="purchase">Purchase</label>
      <select
        id="purchase"
        value={subscribe ? "sub" : "once"}
        onChange={(e) => setSubscribe(e.target.value === "sub")}
      >
        <option value="once">One-time purchase — ${(price / 100).toFixed(0)}</option>
        <option value="sub">Subscribe & save 15% — ${(sub / 100).toFixed(0)}</option>
      </select>
      <button className="btn" type="submit" style={{ width: "100%", textAlign: "center" }}>
        {added ? "Added — going to cart" : "Add to cart"}
      </button>
    </form>
  );
}
