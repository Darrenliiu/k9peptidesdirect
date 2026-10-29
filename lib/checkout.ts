import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { ensureReady } from "./ensure";
import { getProductById, unitPrice } from "./catalog";
import { getPaymentProvider } from "./payments";
import { getSettings, quoteShipping, taxCents, type AddressInput } from "./shipping";
import { notifyOrder, notifyOrderRequest } from "./email";
import { orderItems, orders } from "./schema";

export type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
  subscribe?: boolean;
};

export type PostedAddress = AddressInput & {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  phone?: string;
};

export const CONTACT_METHODS = ["email", "phone", "text"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export async function priceCart(lines: CartLine[]) {
  const priced = [];
  let subtotal = 0;
  let discount = 0;
  for (const line of lines) {
    const qty = Math.max(1, Math.min(20, Math.floor(line.quantity || 1)));
    const product = await getProductById(line.productId);
    if (!product || product.status === "archived") {
      throw new Error("A product in your cart is no longer available.");
    }
    const variant = product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
    let unit = unitPrice(product, variant);
    let lineDiscount = 0;
    if (line.subscribe) {
      lineDiscount = Math.round(unit * 0.15);
      unit -= lineDiscount;
    }
    subtotal += unit * qty + lineDiscount * qty;
    discount += lineDiscount * qty;
    priced.push({
      product,
      variant,
      quantity: qty,
      unitPriceCents: unit,
      subscribe: Boolean(line.subscribe),
    });
  }
  return { priced, subtotalCents: subtotal, discountCents: discount };
}

function paymentToOrder(status: string) {
  if (status === "paid") return { paymentStatus: "paid" as const, status: "confirmed" as const };
  if (status === "failed") return { paymentStatus: "failed" as const, status: "requested" as const };
  if (status === "requested") return { paymentStatus: "unpaid" as const, status: "requested" as const };
  return { paymentStatus: "unpaid" as const, status: "pending" as const };
}

export async function createOrder(input: {
  lines: CartLine[];
  email: string;
  userId?: string | null;
  shipping: PostedAddress;
  billing?: PostedAddress | null;
  shippingMethodId?: string;
  customerNote?: string;
  dogName?: string;
  dogWeight?: string;
  contactMethod?: ContactMethod | string;
  vetConfirmed: boolean;
}) {
  if (!input.vetConfirmed) {
    throw new Error("Please confirm veterinary supervision before checkout.");
  }
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  const phone = (input.shipping.phone ?? "").trim();
  if (phone.length < 7) {
    throw new Error("Enter a phone number so we can follow up.");
  }
  await ensureReady();
  const { priced, subtotalCents, discountCents } = await priceCart(input.lines);
  if (!priced.length) throw new Error("Your cart is empty.");

  const settings = await getSettings();
  const quote = await quoteShipping(input.shipping, subtotalCents - discountCents);
  const method = input.shippingMethodId
    ? quote.methods.find((m) => m.id === input.shippingMethodId)
    : quote.methods[0];
  if (!method) throw new Error("Choose a shipping method.");

  const taxable = subtotalCents - discountCents;
  const shippingCents = method.quotedCents;
  const tax = taxCents(taxable, settings.taxRateBps);
  const total = taxable + shippingCents + tax;

  const db = getDb();
  const id = randomUUID();
  const { query } = await import("./db");
  const seq = await query<{ nextval: string }>("select nextval('order_number_seq')::text as nextval");
  const number = `K9-${seq[0]?.nextval ?? Date.now()}`;
  const contactMethod = CONTACT_METHODS.includes(input.contactMethod as ContactMethod)
    ? (input.contactMethod as ContactMethod)
    : "email";

  await db.insert(orders).values({
    id,
    number,
    userId: input.userId ?? null,
    email,
    status: "requested",
    paymentStatus: "unpaid",
    subtotalCents,
    shippingCents,
    taxCents: tax,
    discountCents,
    totalCents: total,
    shippingMethod: method.name,
    shippingAddress: input.shipping,
    billingAddress: input.billing ?? input.shipping,
    customerNote: input.customerNote || null,
    dogName: input.dogName?.trim() || null,
    dogWeight: input.dogWeight?.trim() || null,
    contactMethod,
    vetConfirmed: true,
  });

  for (const line of priced) {
    await db.insert(orderItems).values({
      id: randomUUID(),
      orderId: id,
      productId: line.product.id,
      variantId: line.variant?.id ?? null,
      name: line.product.name,
      variantName: line.subscribe
        ? `${line.variant?.name ?? ""} · Subscribe`.trim()
        : line.variant?.name ?? null,
      sku: line.variant?.sku ?? line.product.sku,
      quantity: line.quantity,
      unitPriceCents: line.unitPriceCents,
      image: line.product.image,
    });
  }

  const provider = await getPaymentProvider();
  const payment = await provider.createPayment({
    orderId: id,
    orderNumber: number,
    email,
    amountCents: total,
    currency: settings.currency,
  });

  const mapped = paymentToOrder(payment.status);
  await db
    .update(orders)
    .set({
      paymentProvider: payment.provider,
      paymentRef: payment.reference,
      paymentStatus: mapped.paymentStatus,
      status: mapped.status,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, id));

  const customerName = `${input.shipping.firstName} ${input.shipping.lastName}`.trim();
  if (payment.status === "requested") {
    await notifyOrderRequest({
      to: settings.notificationEmail,
      orderNumber: number,
      email,
      customerName,
      phone,
      contactMethod,
      totalCents: total,
      shippingCents,
    });
  } else if (payment.status === "paid") {
    await notifyOrder({
      to: settings.notificationEmail,
      orderNumber: number,
      email,
      totalCents: total,
      status: mapped.status,
    });
  }

  return {
    id,
    number,
    totalCents: total,
    payment,
    shippingCents,
    taxCents: tax,
    subtotalCents,
    discountCents,
  };
}

export async function markOrderPaid(orderId: string, reference: string) {
  await ensureReady();
  const db = getDb();
  await db
    .update(orders)
    .set({
      paymentStatus: "paid",
      paymentRef: reference,
      status: "confirmed",
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));
}
