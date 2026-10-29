import { and, desc, eq, ilike, or } from "drizzle-orm";
import { getDb, hasDatabase } from "./db";
import { ensureReady } from "./ensure";
import { coas, products, type Coa, type Product } from "./schema";

export type CoaWithProduct = Coa & { product: Product };

export function publicCoaPath(id: string) {
  return `/coa/files/${id}`;
}

export async function listPublishedCoas(opts?: { productId?: string; q?: string }): Promise<CoaWithProduct[]> {
  if (!hasDatabase()) return [];
  await ensureReady();
  try {
    const db = getDb();
    const rows = await db
      .select({ coa: coas, product: products })
      .from(coas)
      .innerJoin(products, eq(coas.productId, products.id))
      .where(
        and(
          eq(coas.published, true),
          opts?.productId ? eq(coas.productId, opts.productId) : undefined,
          opts?.q
            ? or(
                ilike(coas.lot, `%${opts.q}%`),
                ilike(products.name, `%${opts.q}%`),
                ilike(products.sku, `%${opts.q}%`),
                ilike(coas.labName, `%${opts.q}%`),
              )
            : undefined,
        ),
      )
      .orderBy(desc(coas.testDate), desc(coas.createdAt));
    return rows.map((r) => ({ ...r.coa, product: r.product }));
  } catch (error) {
    console.error("[coas] listPublishedCoas failed", error);
    return [];
  }
}

export async function listPublishedCoasForProduct(productId: string) {
  return listPublishedCoas({ productId });
}

export async function getPublishedCoa(id: string) {
  if (!hasDatabase()) return null;
  await ensureReady();
  const db = getDb();
  const [row] = await db
    .select({ coa: coas, product: products })
    .from(coas)
    .innerJoin(products, eq(coas.productId, products.id))
    .where(and(eq(coas.id, id), eq(coas.published, true)))
    .limit(1);
  return row ? { ...row.coa, product: row.product } : null;
}

export async function listAdminCoas(): Promise<CoaWithProduct[]> {
  await ensureReady();
  const db = getDb();
  const rows = await db
    .select({ coa: coas, product: products })
    .from(coas)
    .innerJoin(products, eq(coas.productId, products.id))
    .orderBy(desc(coas.createdAt));
  return rows.map((r) => ({ ...r.coa, product: r.product }));
}

export async function getAdminCoa(id: string) {
  await ensureReady();
  const db = getDb();
  const [row] = await db.select().from(coas).where(eq(coas.id, id)).limit(1);
  return row ?? null;
}
