import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { noIndexSeo } from "@/lib/seo";

export const metadata = {
  ...noIndexSeo("Page not found", "/"),
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w">
          <h1>Page not found</h1>
          <p>That URL is not on this site. Try the shop, a protocol bundle, or the research guide.</p>
          <p>
            <a className="btn" href="/shop">
              Shop peptides
            </a>{" "}
            <a className="btn n" href="/bundles">
              Bundles
            </a>{" "}
            <a className="btn n" href="/blog">
              Blog
            </a>{" "}
            <a className="btn n" href="/">
              Home
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
