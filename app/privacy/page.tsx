import { PolicyPage } from "@/components/storefront/PolicyPage";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Privacy Policy",
  description:
    "Draft privacy policy for K9 Peptides Direct: what we collect on orders, accounts, and the newsletter, and how to reach support.",
  path: "/privacy",
  image: "/images/lab.webp",
});

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy" path="/privacy" lede="What we collect when you browse, subscribe, or request an order.">
      <h2>What we collect</h2>
      <p>
        Account email and name if you register. Order details if you request an order (shipping
        address, optional dog notes, and contact preference). Newsletter email if you subscribe.
        Standard server logs and cookies needed to keep you signed in and remember the cart.
      </p>
      <h2>How it is used</h2>
      <p>
        To fulfil requests, send the newsletter you opted into, protect the admin and account
        areas, and improve the storefront. We do not sell customer lists.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions:{" "}
        <a href="mailto:support@k9peptidesdirect.com" style={{ color: "var(--blue)" }}>
          support@k9peptidesdirect.com
        </a>
        .
      </p>
    </PolicyPage>
  );
}
