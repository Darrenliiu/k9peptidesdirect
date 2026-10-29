import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { ProductCard } from "@/components/storefront/ProductCard";
import {
  extractToc,
  getArticle,
  listArticles,
  readingMinutes,
  relatedArticles,
  relatedProducts,
  wordCount,
} from "@/lib/blog";
import { Markdown } from "@/lib/markdown";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  graphJsonLd,
  organizationJsonLd,
  pageSeo,
} from "@/lib/seo";

export function generateStaticParams() {
  return listArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return pageSeo({
      title: "Article not found",
      description: "That journal article is no longer listed.",
      path: `/blog/${slug}`,
      index: false,
    });
  }
  return pageSeo({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
    type: "article",
    publishedTime: `${article.publishedAt}T00:00:00.000Z`,
    modifiedTime: `${article.updatedAt}T00:00:00.000Z`,
    authors: [article.author],
    tags: article.tags,
  });
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];
  const toc = extractToc(article.body);
  const minutes = readingMinutes(article.body);
  const words = wordCount(article.body);
  const more = relatedArticles(article);
  const products = relatedProducts(article);

  return (
    <>
      <JsonLd
        data={graphJsonLd([
          organizationJsonLd(),
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/blog/${article.slug}`,
            image: article.image,
            datePublished: `${article.publishedAt}T00:00:00.000Z`,
            dateModified: `${article.updatedAt}T00:00:00.000Z`,
            author: article.author,
          }),
          breadcrumbJsonLd(crumbs),
        ])}
      />
      <Header />
      <section className="ban" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="w">
          <p className="blog-kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>{article.excerpt}</p>
        </div>
      </section>
      <section className="sec">
        <div className="w blog-layout">
          <article>
            <Breadcrumbs items={crumbs} />
            <p className="blog-byline">
              By {article.author} · {formatDate(article.publishedAt)} · {minutes} min read ·{" "}
              {words.toLocaleString()} words
            </p>
            <p className="blog-tags">
              {article.tags.map((tag) => (
                <a key={tag} className="tag" href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  {tag}
                </a>
              ))}
            </p>
            <Markdown source={article.body} />

            <section className="blog-refs" aria-labelledby="references">
              <h2 id="references">References</h2>
              <ol>
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                    <span> — {source.publisher}</span>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside className="blog-aside">
            <div className="blog-toc">
              <h2>On this page</h2>
              <ol>
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "sub" : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
                <li>
                  <a href="#references">References</a>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {products.length ? (
        <section className="sec alt">
          <div className="w">
            <h2>Related products</h2>
            <p>
              Catalog listings for veterinary-guided research — not evaluated by the FDA and not a
              treatment plan. See the{" "}
              <a href="/dosing" style={{ color: "var(--blue)" }}>
                research guide
              </a>
              .
            </p>
            <div className="grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec">
        <div className="w">
          <h2>Keep reading</h2>
          <div className="grid">
            {more.map((next) => (
              <a className="card" href={`/blog/${next.slug}`} key={next.slug}>
                <div className="img">
                  <img
                    src={next.image}
                    alt={next.imageAlt}
                    loading="lazy"
                    width={480}
                    height={320}
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="b">
                  <span className="tag">{next.category}</span>
                  <h3 style={{ margin: "10px 0 4px" }}>{next.title}</h3>
                  <p style={{ fontSize: 14, margin: 0 }}>{next.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
