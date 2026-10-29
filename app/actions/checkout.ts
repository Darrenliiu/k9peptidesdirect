"use server";

import { z } from "zod";
import { CONTACT_METHODS, createOrder, type CartLine } from "@/lib/checkout";
import { getSession } from "@/lib/session";
import { quoteShipping } from "@/lib/shipping";

const address = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().min(7),
});

const schema = z.object({
  email: z.string().email(),
  lines: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().min(1).max(20),
      subscribe: z.boolean().optional(),
    }),
  ),
  shipping: address,
  billing: address.optional(),
  shippingMethodId: z.string().optional(),
  customerNote: z.string().optional(),
  dogName: z.string().optional(),
  dogWeight: z.string().optional(),
  contactMethod: z.enum(CONTACT_METHODS),
  vetConfirmed: z.boolean(),
});

export async function quoteAction(input: {
  country: string;
  state: string;
  subtotalCents: number;
}) {
  try {
    const quote = await quoteShipping(
      { country: input.country, state: input.state },
      input.subtotalCents,
    );
    return {
      ok: true as const,
      methods: quote.methods.map((m) => ({
        id: m.id,
        name: m.name,
        cents: m.quotedCents,
      })),
    };
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : "Shipping unavailable" };
  }
}

export async function checkoutAction(raw: unknown) {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete every required field." };
  }
  try {
    const session = await getSession();
    const result = await createOrder({
      ...parsed.data,
      lines: parsed.data.lines as CartLine[],
      userId: session?.user.id,
    });
    return {
      ok: true as const,
      orderId: result.id,
      number: result.number,
      payment: result.payment,
    };
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : "Checkout failed" };
  }
}
