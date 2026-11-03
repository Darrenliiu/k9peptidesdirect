import { applyPeerPayEvent, claimWebhook, verifyPeerPaySignature, type PeerPayEvent } from "@/lib/peerpay-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const raw = await request.text();
  const secret = process.env.PEERPAY_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Webhook not configured" }, { status: 503 });

  const ok = verifyPeerPaySignature(
    raw,
    request.headers.get("x-webhook-signature"),
    request.headers.get("x-webhook-timestamp"),
    secret,
  );
  if (!ok) return Response.json({ error: "Invalid signature" }, { status: 401 });

  let event: PeerPayEvent;
  try {
    event = JSON.parse(raw) as PeerPayEvent;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const webhookId = request.headers.get("x-webhook-id") ?? event.id ?? "";
  if (!webhookId) return Response.json({ error: "Missing webhook id" }, { status: 400 });

  try {
    const fresh = await claimWebhook(webhookId, event.type);
    if (!fresh) return Response.json({ received: true, duplicate: true });
    const result = await applyPeerPayEvent(event);
    console.log("peerpay webhook", { webhookId, type: event.type, orderId: event.data?.order?.id ?? null, result });
    return Response.json({ received: true, result });
  } catch (error) {
    console.error("peerpay webhook error", { webhookId, type: event.type, error: error instanceof Error ? error.message : String(error) });
    // Let Peer Pay retry; drop the claim so the retry is processed.
    const { query } = await import("@/lib/db");
    await query("delete from webhook_events where id = $1", [webhookId]).catch(() => {});
    return Response.json({ error: "Processing failed" }, { status: 500 });
  }
}
