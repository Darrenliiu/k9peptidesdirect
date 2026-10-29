import { get } from "@vercel/blob";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { getDb, hasDatabase } from "./db";
import { ensureReady } from "./ensure";
import { coas, products, type Coa, type Product } from "./schema";

export type CoaWithProduct = Coa & { product: Product };

export const ACS_SUPPLIER_NOTE =
  "Certificates of analysis are provided by our supplier's independent third-party lab (ACS Laboratory). K9 Peptides Direct-issued copies are coming soon.";

export function publicCoaPath(id: string, opts?: { download?: boolean }) {
  return opts?.download ? `/coa/files/${id}?download=1` : `/coa/files/${id}`;
}

export function adminCoaPath(id: string) {
  return `/admin/coas/file/${id}`;
}

function safeFilename(name: string) {
  return name.replace(/[^\w.\-]+/g, "-").slice(0, 80) || "coa.pdf";
}

export async function streamCoaFile(coa: Coa, opts?: { download?: boolean; index?: boolean }) {
  const result = await get(coa.filePath || coa.fileUrl, {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  if (!result?.stream) return null;
  const filename = safeFilename(coa.fileName || `${coa.lot}.pdf`);
  const type = coa.contentType || (result.statusCode === 200 ? result.blob.contentType : null) || "application/pdf";
  const headers = new Headers();
  headers.set("Content-Type", type);
  headers.set("Content-Disposition", `${opts?.download ? "attachment" : "inline"}; filename="${filename}"`);
  headers.set("Cache-Control", opts?.index ? "public, max-age=300" : "private, max-age=60");
  if (!opts?.index) headers.set("X-Robots-Tag", "noindex");
  return new Response(result.stream, { headers });
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
