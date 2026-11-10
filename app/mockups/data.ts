// Read-only, static data for design mockups. No database access, no writes.
import { BUNDLE_INCLUDES, SEED_PRODUCTS, type SeedProduct } from "@/lib/catalog-data";
import { formatMoney } from "@/lib/money";

export type MockProduct = SeedProduct & { price: string; purity: string | null; href: string; includes: string[] };

const bySlug = new Map(SEED_PRODUCTS.map((p) => [p.slug, p]));

function purityOf(p: SeedProduct) {
  const m = p.coa.match(/(\d{2}\.\d)%/);
  return m ? `${m[1]}%` : null;
}

function toMock(p: SeedProduct): MockProduct {
  return {
    ...p,
    price: formatMoney(p.salePriceCents ?? p.priceCents),
    purity: purityOf(p),
    href: `/product/${p.slug}`,
    includes: (BUNDLE_INCLUDES[p.slug] ?? []).map((s) => bySlug.get(s)?.name ?? s),
  };
}

export const singles = SEED_PRODUCTS.filter((p) => p.category !== "Bundles").map(toMock);
export const bundles = SEED_PRODUCTS.filter((p) => p.category === "Bundles").map(toMock);
export const featured = singles.slice(0, 4);

export const GOALS = [
  { g: "Joint & Mobility", d: "Aging joints, hips, everyday movement", i: "goal-joint", href: "/product/joint-pack" },
  { g: "Recovery", d: "Tissue and post-activity research", i: "goal-surgery", href: "/product/bpc-157" },
  { g: "Senior Longevity", d: "Cellular energy and healthy aging", i: "goal-senior", href: "/product/senior-pack" },
  { g: "Working & Sport", d: "Protocols for high-output dogs", i: "goal-performance", href: "/product/performance-pack" },
] as const;

export const PAY_METHODS = ["Zelle", "Cash App", "Venmo", "PayPal", "Crypto"] as const;

export const DISCLAIMER =
  "Products are sold for research and veterinary-guided use only. Not intended to diagnose, treat, cure or prevent any disease. Always consult a licensed veterinarian before starting any peptide protocol. Statements have not been evaluated by the FDA.";

export const COA_NOTE =
  "Certificates of analysis are provided by our supplier's independent third-party lab (ACS Laboratory). K9 Peptides Direct-issued copies are coming soon.";

export const FAQ = [
  { q: "Where can I see lab results?", a: "Every published certificate of analysis lives in the COA library, searchable by product and lot number." },
  { q: "How is my order shipped?", a: "Orders ship in insulated cold-pack packaging to help protect lyophilized vials in transit." },
  { q: "What comes in the box?", a: "Single vials include bacteriostatic water, insulin syringes, alcohol pads and a weight-based dosing card." },
  { q: "How can I pay?", a: "Checkout supports Zelle, Cash App, Venmo, PayPal and crypto." },
] as const;
