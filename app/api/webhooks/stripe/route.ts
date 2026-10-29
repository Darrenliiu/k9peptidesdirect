import { getPaymentProvider } from "@/lib/payments";
import { markOrderPaid } from "@/lib/checkout";

export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("stripe-signature");
  try {
    const provider = await getPaymentProvider();
    if (!provider.parseWebhook) {
      return Response.json({ error: "Webhooks are not enabled for the stub provider" }, { status: 400 });
    }
    const event = await provider.parseWebhook(raw, signature);
    if (event.status === "paid") {
      await markOrderPaid(event.orderId, event.reference);
    }
    return Response.json({ received: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Webhook failed" },
      { status: 400 },
    );
  }
}
