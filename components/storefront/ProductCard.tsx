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
        />
      </div>
      <div className="b">
        <span className="tag">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <span className="card-f">
        <span className="price">
          {sale ? (
            <>
              <s className="was">
                {formatMoney(product.priceCents)}
              </s>
              {formatMoney(price)}
            </>
          ) : (
            formatMoney(price).replace(".00", "")
          )}
        </span>
        <span className="card-go" aria-hidden>
          →
        </span>
        </span>
      </div>
    </a>
  );
}
