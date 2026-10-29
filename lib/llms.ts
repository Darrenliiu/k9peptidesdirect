import { listArticles } from "./blog";
import { SEED_PRODUCTS } from "./catalog-data";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "./seo";

const singles = SEED_PRODUCTS.filter((p) => p.category !== "Bundles");
const bundles = SEED_PRODUCTS.filter((p) => p.category === "Bundles");

export function llmsTxt() {
  const productLines = singles.map((p) => `- [${p.name}](${SITE_URL}/product/${p.slug}): ${p.shortDescription}`);
  const bundleLines = bundles.map((p) => `- [${p.name}](${SITE_URL}/product/${p.slug}): ${p.shortDescription}`);
  return `# ${SITE_NAME}

> Research-grade peptides formulated for canine wellness. Lab-verified vials and protocol bundles, sold for veterinary-guided research use only. Not evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent disease.

K9 Peptides Direct is a US storefront for lyophilized research peptides and protocol bundles intended for licensed veterinary supervision. Products ship cold-pack. A request-order flow collects customer details; payment is arranged by the team.

## Site

- [Home](${SITE_URL}/)
- [Shop](${SITE_URL}/shop)
- [Bundles](${SITE_URL}/bundles)
- [Blog](${SITE_URL}/blog)
- [Research guide](${SITE_URL}/dosing)
- [About](${SITE_URL}/about)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)
- [Full llms.txt](${SITE_URL}/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Single peptides

${productLines.join("\n")}

## Protocol bundles

${bundleLines.join("\n")}

## Journal

${listArticles()
  .map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.excerpt}`)
  .join("\n")}

## Positioning

- Research and veterinary-guided use only. Not for human consumption.
- Consult a licensed veterinarian before any protocol.
- No disease-treatment claims. Certificates of analysis are published per batch when available.
- Private routes (/admin, /account, /checkout, /login, /api) are not for indexing.

Contact: ${SITE_EMAIL}
`;
}

export function llmsFullTxt() {
  const productBlocks = SEED_PRODUCTS.map((p) => {
    return `### ${p.name}
- URL: ${SITE_URL}/product/${p.slug}
- SKU: ${p.sku}
- Category: ${p.category}
- Summary: ${p.shortDescription}
- Detail: ${p.description}
- Research note: ${p.researchOverview}
`;
  });
  return `# ${SITE_NAME} — full site brief

${llmsTxt()}

## Brand

${SITE_NAME} sells research-grade canine peptides and goal-based protocol bundles. Copy on the site is educational. Fulfilment is request-based until card or crypto checkout is connected. Cold-pack shipping is standard; threshold for free shipping is $150.

## Compliance

Statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a licensed veterinarian. Most published peptide literature is preclinical (often rodent models) and does not establish veterinary outcomes.

## Catalog

${productBlocks.join("\n")}

## Key public URLs

- ${SITE_URL}/
- ${SITE_URL}/shop
- ${SITE_URL}/bundles
- ${SITE_URL}/product/bpc-157
- ${SITE_URL}/product/tb-500
- ${SITE_URL}/product/nad
- ${SITE_URL}/product/glutathione
- ${SITE_URL}/product/b-complex
- ${SITE_URL}/product/aod-9604
- ${SITE_URL}/product/joint-pack
- ${SITE_URL}/product/gut-healing
- ${SITE_URL}/product/starter-pack
- ${SITE_URL}/product/senior-pack
- ${SITE_URL}/product/performance-pack
- ${SITE_URL}/product/cognitive-pack
- ${SITE_URL}/blog
${listArticles()
  .map((a) => `- ${SITE_URL}/blog/${a.slug}`)
  .join("\n")}
- ${SITE_URL}/dosing
- ${SITE_URL}/about
- ${SITE_URL}/faq
- ${SITE_URL}/contact
`;
}
