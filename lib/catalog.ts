import { asc, eq, ilike, or } from "drizzle-orm";
import { SEED_PRODUCTS, WEIGHTS, type SeedProduct } from "./catalog-data";
import { getDb, hasDatabase } from "./db";
import { ensureReady } from "./ensure";
import { productVariants, products, type Product, type ProductVariant } from "./schema";

export type CatalogProduct = Product & { variants: ProductVariant[] };

function seedAsProduct(p: SeedProduct): CatalogProduct {
  return {
    ...p,
    status: "active",
    createdAt: new Date(0),
    updatedAt: new Date(0),
    variants: WEIGHTS.map((name, i) => ({
      id: `${p.id}-${["small", "medium", "large"][i]}`,
      productId: p.id,
      name,
      sku: `${p.sku}-${["S", "M", "L"][i]}`,
      priceCents: null,
      stock: null,
      sortOrder: i,
    })),
  };
}

export function unitPrice(product: Pick<Product, "priceCents" | "salePriceCents">, variant?: ProductVariant | null) {
  if (variant?.priceCents != null) return variant.priceCents;
  return product.salePriceCents ?? product.priceCents;
}

export async function listProducts(opts?: { includeArchived?: boolean }) {
  if (hasDatabase()) {
    await ensureReady();
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(products)
        .where(opts?.includeArchived ? undefined : eq(products.status, "active"))
        .orderBy(asc(products.sortOrder), asc(products.name));
      const variants = await db.select().from(productVariants).orderBy(asc(productVariants.sortOrder));
      return rows.map((p) => ({
        ...p,
        variants: variants.filter((v) => v.productId === p.id),
      }));
    } catch (error) {
      console.error("[catalog] falling back to seed", error);
    }
  }
  return SEED_PRODUCTS.map(seedAsProduct);
}

export async function getProductBySlug(slug: string) {
  const all = await listProducts({ includeArchived: true });
  return all.find((p) => p.slug === slug && p.status === "active") ?? null;
}

export async function getProductById(id: string) {
  if (!hasDatabase()) return SEED_PRODUCTS.find((p) => p.id === id) ? seedAsProduct(SEED_PRODUCTS.find((p) => p.id === id)!) : null;
  await ensureReady();
  const db = getDb();
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!row) return null;
  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, id))
    .orderBy(asc(productVariants.sortOrder));
  return { ...row, variants };
}

export async function searchAdminProducts(q?: string) {
  await ensureReady();
  const db = getDb();
  const rows = q
    ? await db
        .select()
        .from(products)
        .where(
          or(
            ilike(products.name, `%${q}%`),
            ilike(products.sku, `%${q}%`),
            ilike(products.category, `%${q}%`),
          ),
        )
        .orderBy(asc(products.sortOrder))
    : await db.select().from(products).orderBy(asc(products.sortOrder));
  const variants = await db.select().from(productVariants);
  return rows.map((p) => ({ ...p, variants: variants.filter((v) => v.productId === p.id) }));
}

export async function featuredProducts() {
  const all = await listProducts();
  return all.filter((p) => p.featured).slice(0, 4);
}

