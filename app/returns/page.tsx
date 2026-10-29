import { PolicyPage } from "@/components/storefront/PolicyPage";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Returns and Refunds",
  description:
    "Return unopened K9 Peptides Direct research products within 30 days. Contact support to start a return or refund request.",
  path: "/returns",
  image: "/images/lab.webp",
});

export default function ReturnsPage() {
  return (
    <PolicyPage title="Returns / Refunds" path="/returns" lede="How to send an unopened vial back, and when a refund is considered.">
      <h2>Unopened returns</h2>
      <p>
        Unopened products may be returned within 30 days of delivery. Email{" "}
        <a href="mailto:support@k9peptidesdirect.com" style={{ color: "var(--blue)" }}>
          support@k9peptidesdirect.com
        </a>{" "}
        with the order number before you ship anything back.
      </p>
      <h2>Opened or reconstituted vials</h2>
      <p>
        Opened, reconstituted, or temperature-abused vials are generally not eligible. Cold-chain
        history is part of quality. If a pack arrived damaged or warm, use the{" "}
        <a href="/shipping" style={{ color: "var(--blue)" }}>
          shipping page
        </a>{" "}
        instead of a standard return.
      </p>
      <h2>Refunds</h2>
      <p>
        Approved returns are refunded to the original payment method after the warehouse confirms
        the unopened lot. Request-order deposits, if any, follow the same review.
      </p>
    </PolicyPage>
  );
}
