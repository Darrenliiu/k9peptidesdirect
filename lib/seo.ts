import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";
export const SITE_NAME = "K9 Peptides Direct";
export const SITE_EMAIL = "support@k9peptidesdirect.com";
export const DEFAULT_OG = "/images/hero-dog.webp";
export const SEO_LASTMOD = "2026-10-29";

export const DEFAULT_DESCRIPTION =
  "Research-grade peptides formulated for canine wellness. Lab-verified vials and protocol bundles, sold for veterinary-guided research use only.";

export function absUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function pageSeo({
  title,
  description,
  path,
  image = DEFAULT_OG,
  index = true,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageSeoInput): Metadata {
  const url = absUrl(path);
  const ogImage = absUrl(image);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const noIndexSeo = (title: string, path: string): Metadata =>
  pageSeo({
    title,
    description: `${title} on ${SITE_NAME}. This page is not indexed.`,
    path,
    index: false,
  });

export type Crumb = { name: string; path: string };

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    logo: absUrl("/favicon.svg"),
    description: DEFAULT_DESCRIPTION,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  image: string;
  sku: string;
  slug: string;
  priceCents: number;
  stock: number;
}) {
  return {
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: absUrl(input.image),
    sku: input.sku,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      url: absUrl(`/product/${input.slug}`),
      priceCurrency: "USD",
      price: (input.priceCents / 100).toFixed(2),
      availability: input.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [absUrl(input.image)],
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { "@type": "Organization", name: input.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(input.path) },
    isAccessibleForFree: true,
  };
}

export function graphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
