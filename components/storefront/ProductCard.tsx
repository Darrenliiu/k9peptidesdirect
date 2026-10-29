import { displayPrice, formatMoney } from "@/lib/money";

type CardProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
  priceCents: number;
  salePriceCents?: number | null;
};

export function ProductCard({ product }: { product: CardProduct }) {
  const price = displayPrice(product);
  const sale = product.salePriceCents != null && product.salePriceCents < product.priceCents;
  return (
    <a className="card" href={`/product/${product.slug}`}>
      <div className="img">
        <img
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          loading="lazy"
          width={480}
          height={480}
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="b">
        <span className="tag">{product.category}</span>
        <h3 style={{ margin: "10px 0 4px" }}>{product.name}</h3>
        <p style={{ fontSize: 14, margin: "0 0 10px" }}>{product.shortDescription}</p>
        <span className="price">
          {sale ? (
            <>
              <s style={{ opacity: 0.55, marginRight: 8, fontWeight: 500 }}>
                {formatMoney(product.priceCents)}
              </s>
              {formatMoney(price)}
            </>
          ) : (
            formatMoney(price).replace(".00", "")
          )}
        </span>
      </div>
    </a>
  );
}
