export type PaymentIntent = {
  provider: string;
  status: "paid" | "pending" | "failed";
  reference: string;
  clientSecret?: string;
};

export type PaymentProvider = {
  id: string;
  createPayment: (input: {
    orderId: string;
    orderNumber: string;
    email: string;
    amountCents: number;
    currency: string;
  }) => Promise<PaymentIntent>;
  parseWebhook?: (rawBody: string, signature: string | null) => Promise<{
    orderId: string;
    status: "paid" | "failed";
    reference: string;
  }>;
};

const stub: PaymentProvider = {
  id: "stub",
  async createPayment(input) {
    return {
      provider: "stub",
      status: "paid",
      reference: `stub_${input.orderId}`,
    };
  },
};

async function stripeProvider(): Promise<PaymentProvider> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return {
    id: "stripe",
    async createPayment(input) {
      const res = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          amount: String(input.amountCents),
          currency: input.currency.toLowerCase(),
          receipt_email: input.email,
          "metadata[orderId]": input.orderId,
          "metadata[orderNumber]": input.orderNumber,
          automatic_payment_methods: "true",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Stripe error: ${text}`);
      }
      const data = (await res.json()) as { id: string; client_secret: string; status: string };
      return {
        provider: "stripe",
        status: data.status === "succeeded" ? "paid" : "pending",
        reference: data.id,
        clientSecret: data.client_secret,
      };
    },
    async parseWebhook(rawBody, signature) {
      const secret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!secret || !signature) throw new Error("Missing Stripe webhook secret");
      const crypto = await import("node:crypto");
      const parts = Object.fromEntries(
        signature.split(",").map((p) => {
          const [k, v] = p.split("=");
          return [k, v];
        }),
      );
      const signed = `${parts.t}.${rawBody}`;
      const expected = crypto.createHmac("sha256", secret).update(signed).digest("hex");
      if (expected !== parts.v1) throw new Error("Invalid Stripe signature");
      const event = JSON.parse(rawBody) as {
        type: string;
        data: { object: { id: string; metadata?: { orderId?: string } } };
      };
      const orderId = event.data.object.metadata?.orderId;
      if (!orderId) throw new Error("Webhook missing orderId");
      if (event.type === "payment_intent.succeeded") {
        return { orderId, status: "paid", reference: event.data.object.id };
      }
      if (event.type === "payment_intent.payment_failed") {
        return { orderId, status: "failed", reference: event.data.object.id };
      }
      throw new Error(`Unhandled Stripe event ${event.type}`);
    },
  };
}

export async function getPaymentProvider(): Promise<PaymentProvider> {
  const name = (process.env.PAYMENT_PROVIDER ?? "stub").toLowerCase();
  if (name === "stripe" && process.env.STRIPE_SECRET_KEY) {
    return stripeProvider();
  }
  return stub;
}

export function paymentMode() {
  if ((process.env.PAYMENT_PROVIDER ?? "stub") === "stripe" && process.env.STRIPE_SECRET_KEY) {
    return "stripe" as const;
  }
  return "stub" as const;
}
