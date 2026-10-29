import { formatMoney } from "./money";

async function sendEmail(input: { to: string; subject: string; text: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email]", input.to, input.subject, input.text);
    return { sent: false as const };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "K9 Peptides Direct <orders@k9peptidesdirect.com>",
      to: input.to,
      subject: input.subject,
      text: input.text,
    }),
  });
  if (!res.ok) {
    console.error("[email] resend failed", res.status, await res.text());
  }
  return { sent: res.ok };
}

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
  if (!dest) {
    console.info("[email]", subject, text);
    return { sent: false };
  }
  return sendEmail({ to: dest, subject, text });
}

export async function notifyOrderRequest(input: {
  to?: string | null;
  orderNumber: string;
  email: string;
  customerName: string;
  phone?: string;
  contactMethod?: string;
  totalCents: number;
  shippingCents: number;
}) {
  const team = input.to || process.env.ORDER_NOTIFICATION_EMAIL;
  const money = formatMoney(input.totalCents);
  const customerText = [
    `Hi ${input.customerName || "there"},`,
    "",
    `We received order request ${input.orderNumber}. No payment was taken.`,
    `Estimated total ${money} (includes ${formatMoney(input.shippingCents)} shipping).`,
    "",
    "A teammate will follow up using your preferred contact method to confirm the order and arrange payment.",
    "",
    "— K9 Peptides Direct",
  ].join("\n");
  const teamText = [
    `New order request ${input.orderNumber}`,
    `Customer: ${input.customerName} <${input.email}>`,
    input.phone ? `Phone: ${input.phone}` : null,
    input.contactMethod ? `Preferred contact: ${input.contactMethod}` : null,
    `Estimated total: ${money}`,
    "Status: requested · no payment collected.",
  ]
    .filter(Boolean)
    .join("\n");

  const customer = await sendEmail({
    to: input.email,
    subject: `We received your order request ${input.orderNumber}`,
    text: customerText,
  });
  const shop = team
    ? await sendEmail({
        to: team,
        subject: `New order request ${input.orderNumber} · ${money}`,
        text: teamText,
      })
    : { sent: false as const };
  return { sent: customer.sent || shop.sent };
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
