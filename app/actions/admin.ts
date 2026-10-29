"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { dollarsToCents } from "@/lib/money";
import { ORDER_STATUSES } from "@/lib/orders";
import { requireAdmin } from "@/lib/session";
import {
  orderNotes,
  orders,
  products,
  shippingMethods,
  shippingZones,
  storeSettings,
} from "@/lib/schema";

async function guard() {
  const session = await requireAdmin();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function updateOrderAction(formData: FormData) {
  const session = await guard();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  const db = getDb();
  await db
    .update(orders)
    .set({
      status,
      trackingNumber: String(formData.get("trackingNumber") || "") || null,
      trackingCarrier: String(formData.get("trackingCarrier") || "") || null,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, id));
  const note = String(formData.get("note") || "").trim();
  if (note) {
    await db.insert(orderNotes).values({
      id: randomUUID(),
      orderId: id,
      authorId: session.user.id,
      authorName: session.user.name || session.user.email,
      body: note,
      isCustomerVisible: formData.get("visible") === "on",
    });
  }
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}

export async function saveProductAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "").trim() || slugify(String(formData.get("name") || "product"));
  const slug = String(formData.get("slug") || id).trim();
  const db = getDb();
  const values = {
    id,
    slug,
    name: String(formData.get("name") || ""),
    sku: String(formData.get("sku") || slug.toUpperCase()),
    category: String(formData.get("category") || "Recovery"),
    shortDescription: String(formData.get("shortDescription") || ""),
    description: String(formData.get("description") || ""),
    priceCents: dollarsToCents(String(formData.get("price") || "0")),
    salePriceCents: formData.get("salePrice") ? dollarsToCents(String(formData.get("salePrice"))) : null,
    stock: Number(formData.get("stock") || 0),
    lowStockThreshold: Number(formData.get("lowStockThreshold") || 8),
    image: String(formData.get("image") || "/images/bpc-157.webp"),
    status: formData.get("status") === "archived" ? "archived" : "active",
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") || 99),
    researchOverview: String(formData.get("researchOverview") || ""),
    dosing: String(formData.get("dosing") || ""),
    boxContents: String(formData.get("boxContents") || ""),
    coa: String(formData.get("coa") || ""),
    updatedAt: new Date(),
  };
  await db
    .insert(products)
    .values(values)
    .onConflictDoUpdate({ target: products.id, set: values });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  return { id };
}

export async function archiveProductAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const db = getDb();
  await db.update(products).set({ status: "archived", updatedAt: new Date() }).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function saveShippingAction(formData: FormData) {
  await guard();
  const db = getDb();
  const zoneId = String(formData.get("zoneId") || "us");
  await db
    .insert(shippingZones)
    .values({
      id: zoneId,
      name: String(formData.get("zoneName") || "United States"),
      countries: String(formData.get("countries") || "US"),
      states: String(formData.get("states") || ""),
      enabled: formData.get("zoneEnabled") === "on",
    })
    .onConflictDoUpdate({
      target: shippingZones.id,
      set: {
        name: String(formData.get("zoneName") || "United States"),
        countries: String(formData.get("countries") || "US"),
        states: String(formData.get("states") || ""),
        enabled: formData.get("zoneEnabled") === "on",
      },
    });
  const methodId = String(formData.get("methodId") || "us-cold-pack");
  await db
    .insert(shippingMethods)
    .values({
      id: methodId,
      zoneId,
      name: String(formData.get("methodName") || "Cold-pack Ground"),
      type: String(formData.get("methodType") || "flat"),
      rateCents: dollarsToCents(String(formData.get("rate") || "0")),
      freeOverCents: formData.get("freeOver") ? dollarsToCents(String(formData.get("freeOver"))) : null,
      enabled: true,
      sortOrder: 0,
    })
    .onConflictDoUpdate({
      target: shippingMethods.id,
      set: {
        name: String(formData.get("methodName") || "Cold-pack Ground"),
        type: String(formData.get("methodType") || "flat"),
        rateCents: dollarsToCents(String(formData.get("rate") || "0")),
        freeOverCents: formData.get("freeOver") ? dollarsToCents(String(formData.get("freeOver"))) : null,
      },
    });
  revalidatePath("/admin/shipping");
  revalidatePath("/checkout");
}

export async function saveSettingsAction(formData: FormData) {
  await guard();
  const db = getDb();
  await db
    .insert(storeSettings)
    .values({
      id: "default",
      storeName: String(formData.get("storeName") || "K9 Peptides Direct"),
      supportEmail: String(formData.get("supportEmail") || ""),
      notificationEmail: String(formData.get("notificationEmail") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      taxRateBps: Math.round(Number(formData.get("taxRate") || 0) * 100),
      freeShippingThresholdCents: dollarsToCents(String(formData.get("freeShipping") || "150")),
    })
    .onConflictDoUpdate({
      target: storeSettings.id,
      set: {
        storeName: String(formData.get("storeName") || "K9 Peptides Direct"),
        supportEmail: String(formData.get("supportEmail") || ""),
        notificationEmail: String(formData.get("notificationEmail") || ""),
        phone: String(formData.get("phone") || ""),
        address: String(formData.get("address") || ""),
        taxRateBps: Math.round(Number(formData.get("taxRate") || 0) * 100),
        freeShippingThresholdCents: dollarsToCents(String(formData.get("freeShipping") || "150")),
      },
    });
  revalidatePath("/admin/settings");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48) || `product-${Date.now()}`;
}
