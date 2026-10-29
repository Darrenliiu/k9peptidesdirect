"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/storefront/ProductCard";

type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
  priceCents: number;
  salePriceCents?: number | null;
};

export function ShopFilters({
  products,
  categories,
}: {
  products: ShopProduct[];
  categories: string[];
}) {
  const [cats, setCats] = useState<string[]>([]);
  const [sort, setSort] = useState("best");

  const shown = useMemo(() => {
    let rows = products.filter((p) => !cats.length || cats.includes(p.category));
    if (sort === "low") rows = [...rows].sort((a, b) => (a.salePriceCents ?? a.priceCents) - (b.salePriceCents ?? b.priceCents));
    if (sort === "high") rows = [...rows].sort((a, b) => (b.salePriceCents ?? b.priceCents) - (a.salePriceCents ?? a.priceCents));
    return rows;
  }, [products, cats, sort]);

  return (
    <div className="shop">
      <details className="f" open>
        <summary className="fsum">Filters</summary>
        <h4>Category</h4>
        {categories.map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              style={{ width: "auto" }}
              checked={cats.includes(c)}
              onChange={() =>
                setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
              }
            />{" "}
            {c}
          </label>
        ))}
        <h4>Dog size</h4>
        {["Small (<25 lb)", "Medium (25-60 lb)", "Large (60+ lb)"].map((c) => (
          <label key={c}>
            <input type="checkbox" style={{ width: "auto" }} /> {c}
          </label>
        ))}
        <h4>Price</h4>
        <input type="range" />
      </details>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{shown.length} products</span>
          <select style={{ width: 200 }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="best">Sort: Best selling</option>
            <option value="low">Price low-high</option>
            <option value="high">Price high-low</option>
          </select>
        </div>
        <div className="grid" id="packages">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
