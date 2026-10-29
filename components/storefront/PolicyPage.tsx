import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { JsonLd } from "@/components/storefront/JsonLd";
import { breadcrumbJsonLd, graphJsonLd } from "@/lib/seo";
import type { ReactNode } from "react";

export function PolicyPage({
  title,
  path,
  lede,
  children,
}: {
  title: string;
  path: string;
  lede: string;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <JsonLd data={graphJsonLd([breadcrumbJsonLd(crumbs)])} />
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/lab.webp)" }}>
        <div className="w">
          <h1>{title}</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>{lede}</p>
        </div>
      </section>
      <section className="sec">
        <div className="w policy">
          <Breadcrumbs items={crumbs} />
          <p className="disc">
            Draft for Darren to review. This is a placeholder policy page, not legal advice, and
            should be replaced with counsel-reviewed language before it is treated as binding.
          </p>
          {children}
        </div>
      </section>
      <Footer />
    </>
  );
}
