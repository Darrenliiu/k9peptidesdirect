import type { MetadataRoute } from "next";
import { SEED_PRODUCTS } from "@/lib/catalog-data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/bundles", "/dosing", "/about", "/faq", "/contact", "/cart", "/login"];
  const now = new Date();
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...SEED_PRODUCTS.map((p) => ({
      url: `${SITE}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
