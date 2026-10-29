"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { addresses } from "@/lib/schema";
import { requireUser } from "@/lib/session";

export async function saveAddressAction(formData: FormData) {
  const session = await requireUser();
  if (!session) throw new Error("Unauthorized");
  const db = getDb();
  const id = String(formData.get("id") || "") || randomUUID();
  const values = {
    id,
    userId: session.user.id,
    type: String(formData.get("type") || "shipping"),
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    line1: String(formData.get("line1") || ""),
    line2: String(formData.get("line2") || ""),
    city: String(formData.get("city") || ""),
    state: String(formData.get("state") || ""),
    postalCode: String(formData.get("postalCode") || ""),
    country: String(formData.get("country") || "US"),
    phone: String(formData.get("phone") || ""),
    isDefault: formData.get("isDefault") === "on",
  };
  await db.insert(addresses).values(values).onConflictDoUpdate({
    target: addresses.id,
    set: values,
  });
  revalidatePath("/account/addresses");
}

export async function deleteAddressAction(formData: FormData) {
  const session = await requireUser();
  if (!session) throw new Error("Unauthorized");
  const id = String(formData.get("id") || "");
  const db = getDb();
  await db.delete(addresses).where(eq(addresses.id, id));
  revalidatePath("/account/addresses");
}
