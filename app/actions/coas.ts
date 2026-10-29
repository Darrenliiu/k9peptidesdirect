"use server";

import { randomUUID } from "node:crypto";
import { del, put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProductById } from "@/lib/catalog";
import { getDb } from "@/lib/db";
import { ensureReady } from "@/lib/ensure";
import { coas } from "@/lib/schema";
import { requireAdmin } from "@/lib/session";

const ALLOWED = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 8 * 1024 * 1024;

async function guard() {
  const session = await requireAdmin();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function cleanLot(value: string) {
  return value.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}

async function revalidateCoaSurfaces(productId?: string) {
  revalidatePath("/admin/coas");
  revalidatePath("/coa");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");
  if (productId) {
    const product = await getProductById(productId);
    revalidatePath(`/product/${product?.slug || productId}`);
  }
  revalidatePath("/shop");
}

export async function createCoaAction(formData: FormData) {
  await guard();
  await ensureReady();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Blob storage is not configured.");
  }
  const productId = String(formData.get("productId") || "").trim();
  const lot = cleanLot(String(formData.get("lot") || "").trim());
  const testDate = String(formData.get("testDate") || "").trim() || null;
  const labName = String(formData.get("labName") || "").trim() || null;
  const purityPercent = String(formData.get("purityPercent") || "").trim() || null;
  const published = formData.get("published") === "on";
  const file = formData.get("file");
  if (!productId) throw new Error("Choose a product.");
  if (!lot) throw new Error("Enter a batch / lot number.");
  if (!(file instanceof File) || !file.size) throw new Error("Upload a PDF or image.");
  if (file.size > MAX_BYTES) throw new Error("File must be 8 MB or smaller.");
  const contentType = file.type || "application/pdf";
  if (!ALLOWED.has(contentType)) throw new Error("Upload a PDF, JPG, PNG, or WebP.");

  const safeName = file.name.replace(/[^\w.\-]+/g, "-").slice(0, 80) || "coa.pdf";
  const uploaded = await put(`coas/${productId}/${lot}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const id = randomUUID();
  const db = getDb();
  await db.insert(coas).values({
    id,
    productId,
    lot,
    testDate,
    labName,
    purityPercent,
    fileUrl: uploaded.url,
    filePath: uploaded.pathname,
    fileName: safeName,
    contentType,
    published,
  });
  await revalidateCoaSurfaces(productId);
  redirect("/admin/coas?saved=1");
}

export async function toggleCoaAction(formData: FormData) {
  await guard();
  await ensureReady();
  const id = String(formData.get("id") || "");
  const published = String(formData.get("published") || "") === "true";
  const db = getDb();
  const [row] = await db.select().from(coas).where(eq(coas.id, id)).limit(1);
  if (!row) throw new Error("COA not found");
  await db.update(coas).set({ published }).where(eq(coas.id, id));
  await revalidateCoaSurfaces(row.productId);
}

export async function deleteCoaAction(formData: FormData) {
  await guard();
  await ensureReady();
  const id = String(formData.get("id") || "");
  const db = getDb();
  const [row] = await db.select().from(coas).where(eq(coas.id, id)).limit(1);
  if (!row) return;
  if (row.filePath) {
    try {
      await del(row.filePath, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch (error) {
      console.error("[coas] blob delete failed", error);
    }
  }
  await db.delete(coas).where(eq(coas.id, id));
  await revalidateCoaSurfaces(row.productId);
}
