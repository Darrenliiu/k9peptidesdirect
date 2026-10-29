import { SEED_PRODUCTS } from "./catalog-data";

export type NavProduct = {
  slug: string;
  name: string;
  href: string;
};

function toNav(p: { slug: string; name: string }): NavProduct {
  return { slug: p.slug, name: p.name, href: `/product/${p.slug}` };
}

export function navPeptides(): NavProduct[] {
  return SEED_PRODUCTS.filter((p) => p.category !== "Bundles").map(toNav);
}

export function navBundles(): NavProduct[] {
  return SEED_PRODUCTS.filter((p) => p.category === "Bundles").map(toNav);
}

export function navTopProducts(limit = 4): NavProduct[] {
  return navPeptides().slice(0, limit);
}

export const MEGA_FEATURE = {
  href: "/shop",
  image: "/images/joint-pack.webp",
  alt: "Joint & Recovery Pack — BPC-157 and TB-500 bundle",
  title: "Protocol bundles",
  text: "Vet-guided stacks for recovery, seniors, and working dogs.",
  cta: "Shop all",
};
