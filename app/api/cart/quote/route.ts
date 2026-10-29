import { priceCart, type CartLine } from "@/lib/checkout";
import { jsonError, originAllowed } from "@/lib/security";

export async function POST(request: Request) {
  if (!originAllowed(request)) return jsonError("Invalid origin", 403);
  const body = (await request.json().catch(() => null)) as { lines?: CartLine[] } | null;
  try {
    const { priced } = await priceCart(body?.lines ?? []);
    return Response.json({
      lines: priced.map((l) => ({
        productId: l.product.id,
        variantId: l.variant?.id,
        quantity: l.quantity,
        subscribe: l.subscribe,
        name: l.product.name,
        variantName: l.variant?.name,
        unitPriceCents: l.unitPriceCents,
        image: l.product.image,
      })),
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Cart error");
  }
}
