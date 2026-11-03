export type PaymentStatus = "requested" | "pending" | "paid" | "failed";

export type PaymentIntent = {
  provider: string;
  status: PaymentStatus;
  reference: string;
  clientSecret?: string;
  /** Present when a later provider (Stripe / crypto) needs an off-site hop. */
  checkoutUrl?: string;
};

export type CreatePaymentInput = {
  orderId: string;
  orderNumber: string;
  email: string;
  amountCents: number;
  currency: string;
  /** Customer's chosen method: venmo | cashapp | zelle | paypal | crypto */
  paymentMethod?: string;
};

export type PaymentProvider = {
  id: string;
  createPayment: (input: CreatePaymentInput) => Promise<PaymentIntent>;
  parseWebhook?: (
    rawBody: string,
    signature: string | null,
  ) => Promise<{
    orderId: string;
    status: "paid" | "failed";
    reference: string;
  }>;
};

/**
 * Default go-live provider. No money is collected; the order is a request
 * the team confirms and invoices later.
 */
const requestProvider: PaymentProvider = {
  id: "request",
  async createPayment(input) {
    return {
      provider: "request",
      status: "requested",
      reference: `req_${input.orderId}`,
    };
  },
};

/** Kept for local scripts. Does not collect a card; marks the intent paid. */
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

/**
 * Hook for a later Coinbase Commerce / NOWPayments / BTCPay integration.
 * Selecting PAYMENT_PROVIDER=crypto (or a named provider) throws until a
 * real adapter is wired here — do not invent invoices.
 */
export async function createCryptoInvoice(_input: CreatePaymentInput): Promise<PaymentIntent> {
  throw new Error(
    "Crypto checkout is not enabled yet. Keep PAYMENT_PROVIDER=request until a Coinbase Commerce, NOWPayments, or BTCPay adapter is added.",
  );
}

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

function peerpayOptions() {
  const apiKey = process.env.PEERPAY_API_KEY;
  if (!apiKey) throw new Error("PEERPAY_API_KEY is not set");
  return {
    apiKey,
    apiBaseUrl: process.env.PEERPAY_API_BASE_URL || "https://api.pay.peer.xyz",
    checkoutBaseUrl: process.env.PEERPAY_CHECKOUT_BASE_URL || "https://pay.peer.xyz",
    signal: AbortSignal.timeout(20_000),
  };
}

export function siteUrl() {
  const override = process.env.PEERPAY_RETURN_BASE_URL;
  if (override) return override.replace(/\/$/, "");
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** Peer Pay hosted checkout. Server-only: the API key never reaches the browser. */
export const FIAT_RAILS = new Set(["venmo", "cashapp", "zelle", "paypal"]);

const peerpayProvider: PaymentProvider = {
  id: "peerpay",
  async createPayment(input) {
    const { createCheckout } = await import("@zkp2p/pay-sdk");
    const base = siteUrl();
    const result = await createCheckout(
      {
        requestedFiatAmount: (input.amountCents / 100).toFixed(2),
        requestedFiatCurrency: (input.currency || "USD").toUpperCase(),
        idempotencyKey: input.orderId,
        successUrl: `${base}/checkout/success?order=${encodeURIComponent(input.orderNumber)}`,
        cancelUrl: `${base}/checkout?cancelled=${encodeURIComponent(input.orderNumber)}`,
        notes: { merchantOrderId: input.orderId, orderNumber: input.orderNumber },
      } as Parameters<typeof createCheckout>[0],
      {
        ...peerpayOptions(),
        // Opens hosted checkout straight on the chosen app (?method=<rail>).
        // Crypto has no single rail, so it lands on method selection.
        ...(input.paymentMethod && FIAT_RAILS.has(input.paymentMethod)
          ? { preselectedMethod: input.paymentMethod as "venmo" }
          : {}),
      },
    );
    if (!result.checkoutUrl) {
      throw new Error("Peer Pay did not return a checkout link. Please try again.");
    }
    return {
      provider: "peerpay",
      status: "pending",
      reference: result.order.id,
      checkoutUrl: result.checkoutUrl,
    };
  },
};

const CRYPTO_ALIASES = new Set(["crypto", "coinbase", "nowpayments", "btcpay"]);

export function paymentProviderName() {
  return (process.env.PAYMENT_PROVIDER ?? "request").toLowerCase();
}

export async function getPaymentProvider(): Promise<PaymentProvider> {
  const name = paymentProviderName();
  if (name === "stripe" && process.env.STRIPE_SECRET_KEY) {
    return stripeProvider();
  }
  if (name === "peerpay") return peerpayProvider;
  if (CRYPTO_ALIASES.has(name)) {
    return {
      id: name,
      createPayment: createCryptoInvoice,
    };
  }
  if (name === "stub") return stub;
  return requestProvider;
}

export function paymentMode() {
  const name = paymentProviderName();
  if (name === "stripe" && process.env.STRIPE_SECRET_KEY) return "stripe" as const;
  if (CRYPTO_ALIASES.has(name)) return "crypto" as const;
  if (name === "peerpay") return "peerpay" as const;
  if (name === "stub") return "stub" as const;
  return "request" as const;
}
