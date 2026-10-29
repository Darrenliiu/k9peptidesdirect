import { SEED_PRODUCTS, type SeedProduct } from "./catalog-data";
import { ARTICLES } from "./blog-articles";

export type BlogSource = {
  title: string;
  url: string;
  publisher: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
  sources: BlogSource[];
  body: string;
};

export const BLOG_PAGE_SIZE = 6;
export const BLOG_AUTHOR = "K9 Peptides Direct Editorial";

export const BLOG_ARTICLES: BlogArticle[] = ARTICLES;

export function listArticles() {
  return [...BLOG_ARTICLES].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function listCategories() {
  return Array.from(new Set(listArticles().map((a) => a.category)));
}

export function listTags() {
  return Array.from(new Set(listArticles().flatMap((a) => a.tags))).sort((a, b) => a.localeCompare(b));
}

export function filterArticles(opts: { category?: string; tag?: string }) {
  return listArticles().filter((a) => {
    if (opts.category && a.category !== opts.category) return false;
    if (opts.tag && !a.tags.includes(opts.tag)) return false;
    return true;
  });
}

export function paginateArticles(articles: BlogArticle[], page: number) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const totalPages = Math.max(1, Math.ceil(articles.length / BLOG_PAGE_SIZE));
  const current = Math.min(safePage, totalPages);
  const start = (current - 1) * BLOG_PAGE_SIZE;
  return {
    items: articles.slice(start, start + BLOG_PAGE_SIZE),
    page: current,
    totalPages,
    total: articles.length,
  };
}

export function relatedArticles(article: BlogArticle) {
  const bySlug = article.relatedArticleSlugs
    .map((slug) => getArticle(slug))
    .filter((a): a is BlogArticle => Boolean(a));
  if (bySlug.length) return bySlug;
  return listArticles().filter((a) => a.slug !== article.slug).slice(0, 3);
}

export function relatedProducts(article: BlogArticle): SeedProduct[] {
  return article.relatedProductSlugs
    .map((slug) => SEED_PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is SeedProduct => Boolean(p));
}

export function wordCount(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(text: string) {
  return Math.max(1, Math.round(wordCount(text) / 220));
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Map<string, number>();
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    let id = slugifyHeading(text);
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    items.push({ id, text, level });
  }
  return items;
}

export function blogHref(opts: { category?: string; tag?: string; page?: number }) {
  const params = new URLSearchParams();
  if (opts.category) params.set("category", opts.category);
  if (opts.tag) params.set("tag", opts.tag);
  if (opts.page && opts.page > 1) params.set("page", String(opts.page));
  const q = params.toString();
  return q ? `/blog?${q}` : "/blog";
}
