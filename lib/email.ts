import { formatMoney } from "./money";

export async function notifyOrder(input: {
  to?: string | null;
  orderNumber: string;
  email: string;
  totalCents: number;
  status: string;
}) {
  const dest = input.to || process.env.ORDER_NOTIFICATION_EMAIL;
  const subject = `New order ${input.orderNumber} · ${formatMoney(input.totalCents)}`;
  const text = `Order ${input.orderNumber} from ${input.email} is ${input.status}. Total ${formatMoney(input.totalCents)}.`;
  if (!dest || !process.env.RESEND_API_KEY) {
    console.info("[email]", subject, text);
    return { sent: false };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "K9 Peptides Direct <orders@k9peptidesdirect.com>",
      to: dest,
      subject,
      text,
    }),
  });
  return { sent: res.ok };
}

export function trackingUrl(carrier?: string | null, number?: string | null) {
  if (!number) return null;
  const n = encodeURIComponent(number.trim());
  const c = (carrier ?? "").toLowerCase();
  if (c.includes("ups")) return `https://www.ups.com/track?tracknum=${n}`;
  if (c.includes("usps")) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`;
  if (c.includes("fedex")) return `https://www.fedex.com/fedextrack/?trknbr=${n}`;
  if (c.includes("dhl")) return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${n}`;
  return `https://www.google.com/search?q=${encodeURIComponent(`${carrier ?? ""} ${number}`)}`;
}
