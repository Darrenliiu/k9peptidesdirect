import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import {
  blogHref,
  filterArticles,
  listCategories,
  listTags,
  paginateArticles,
} from "@/lib/blog";
import { breadcrumbJsonLd, graphJsonLd, pageSeo } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export const metadata = pageSeo({
  title: "Journal",
  description:
    "Educational notes on peptides, laboratory paperwork, senior-dog veterinary care, and handling. Research-use only — not FDA-evaluated and not a substitute for a licensed veterinarian.",
  path: "/blog",
  image: "/images/lab.webp",
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category?.trim() || undefined;
  const tag = sp.tag?.trim() || undefined;
  const page = Number(sp.page || "1");
  const filtered = filterArticles({ category, tag });
  const { items, page: current, totalPages, total } = paginateArticles(filtered, page);
  const categories = listCategories();
  const tags = listTags();

  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/lab.webp)" }}>
        <div className="w">
          <h1>Journal</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            General-information articles for owners and veterinarians. Educational tone only.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <Breadcrumbs items={crumbs} />
          <p>
            These notes explain chemistry, published research limits, laboratory paperwork, and
            handling. They do not diagnose, treat, cure, or prevent disease. Products are sold for
            research and veterinary-guided use and have not been evaluated by the FDA. Confirm every
            question with a licensed veterinarian. For charts, see the{" "}
            <a href="/dosing" style={{ color: "var(--blue)" }}>
              research guide
            </a>{" "}
            and{" "}
            <a href="/faq" style={{ color: "var(--blue)" }}>
              FAQ
            </a>
            .
          </p>

          <div className="blog-filters" aria-label="Filter articles">
            <div>
              <span className="blog-filter-label">Topics</span>
              <a className={!category ? "tag on" : "tag"} href={blogHref({ tag })}>
                All
              </a>
              {categories.map((c) => (
                <a
                  key={c}
                  className={category === c ? "tag on" : "tag"}
                  href={blogHref({ category: c, tag })}
                >
                  {c}
                </a>
              ))}
            </div>
            <div>
              <span className="blog-filter-label">Tags</span>
              <a className={!tag ? "tag on" : "tag"} href={blogHref({ category })}>
                All
              </a>
              {tags.map((t) => (
                <a
                  key={t}
                  className={tag === t ? "tag on" : "tag"}
                  href={blogHref({ category, tag: t })}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          <p className="blog-count">
            {total} article{total === 1 ? "" : "s"}
            {category ? ` in ${category}` : ""}
            {tag ? ` tagged ${tag}` : ""}
            {totalPages > 1 ? ` · page ${current} of ${totalPages}` : ""}
          </p>

          {items.length === 0 ? (
            <p>
              No articles match that filter.{" "}
              <a href="/blog" style={{ color: "var(--blue)" }}>
                Clear filters
              </a>
              .
            </p>
          ) : (
            <div className="grid blog-grid">
              {items.map((article) => (
                <a className="card" href={`/blog/${article.slug}`} key={article.slug}>
                  <div className="img">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      loading="lazy"
                      width={480}
                      height={320}
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="b">
                    <span className="tag">{article.category}</span>
                    <h2 className="blog-card-title">{article.title}</h2>
                    <p style={{ fontSize: 14, margin: "0 0 10px" }}>{article.excerpt}</p>
                    <p className="blog-meta">
                      {formatDate(article.publishedAt)} · {article.author}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="blog-pager" aria-label="Blog pages">
              {current > 1 ? (
                <a href={blogHref({ category, tag, page: current - 1 })}>Previous</a>
              ) : (
                <span>Previous</span>
              )}
              <span>
                Page {current} of {totalPages}
              </span>
              {current < totalPages ? (
                <a href={blogHref({ category, tag, page: current + 1 })}>Next</a>
              ) : (
                <span>Next</span>
              )}
            </nav>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}
