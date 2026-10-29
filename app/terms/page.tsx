import { PolicyPage } from "@/components/storefront/PolicyPage";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Terms of Use",
  description:
    "Draft terms for K9 Peptides Direct: research-use products, veterinary guidance, and limits of the storefront.",
  path: "/terms",
  image: "/images/lab.webp",
});

export default function TermsPage() {
  return (
    <PolicyPage title="Terms" path="/terms" lede="The rules for using this storefront and requesting research peptides.">
      <h2>Research use</h2>
      <p>
        Products are sold for research and veterinary-guided use only. They are not intended to
        diagnose, treat, cure, or prevent disease. Statements have not been evaluated by the FDA.
      </p>
      <h2>Orders</h2>
      <p>
        Submitting a request is not a guaranteed shipment. The team reviews the request, confirms
        details, and arranges payment. See{" "}
        <a href="/shipping" style={{ color: "var(--blue)" }}>
          shipping
        </a>{" "}
        and{" "}
        <a href="/returns" style={{ color: "var(--blue)" }}>
          returns
        </a>
        .
      </p>
      <h2>Site content</h2>
      <p>
        Journal articles, the research guide, and COAs are educational. They are not a substitute
        for a licensed veterinarian who has examined the dog.
      </p>
    </PolicyPage>
  );
}
