import type { MetadataRoute } from "next";
import { listArticles } from "@/lib/blog";
import { SEED_PRODUCTS } from "@/lib/catalog-data";
import { SEO_LASTMOD, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SEO_LASTMOD}T00:00:00.000Z`);
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bundles", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/dosing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  ];
  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path === "/" ? "/" : r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...SEED_PRODUCTS.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: p.category === "Bundles" ? 0.75 : 0.8,
    })),
    ...listArticles().map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(`${a.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
