import { PolicyPage } from "@/components/storefront/PolicyPage";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Shipping",
  description:
    "Cold-pack shipping for K9 Peptides Direct research peptides. Typical 1–3 day transit. Free cold-pack shipping on orders over $150.",
  path: "/shipping",
  image: "/images/lab.webp",
});

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping" path="/shipping" lede="How research vials leave the lab and reach the clinic or clinic-adjacent fridge.">
      <h2>Cold-pack fulfilment</h2>
      <p>
        Orders ship in insulated cold packs. Typical transit is 1–3 business days inside the
        contiguous United States. Free cold-pack shipping applies when the merchandise subtotal is
        $150 or more.
      </p>
      <h2>When we ship</h2>
      <p>
        Requested orders are reviewed before they leave. The team confirms the request, then
        arranges payment and a ship date. Tracking is sent once a label is created.
      </p>
      <h2>If a pack arrives warm</h2>
      <p>
        Stop and email{" "}
        <a href="mailto:support@k9peptidesdirect.com" style={{ color: "var(--blue)" }}>
          support@k9peptidesdirect.com
        </a>{" "}
        with the order number and photos of the pack-out. Do not guess whether the lot is still the
        lot that was tested. See the{" "}
        <a href="/faq" style={{ color: "var(--blue)" }}>
          FAQ
        </a>{" "}
        and{" "}
        <a href="/blog/peptide-storage-handling" style={{ color: "var(--blue)" }}>
          storage note
        </a>
        .
      </p>
    </PolicyPage>
  );
}
