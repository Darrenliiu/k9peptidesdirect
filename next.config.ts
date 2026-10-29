import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  experimental: {
    serverActions: { bodySizeLimit: "12mb" },
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/product.html", destination: "/product/bpc-157", permanent: true },
      { source: "/packages.html", destination: "/bundles", permanent: true },
      { source: "/packages", destination: "/bundles", permanent: true },
      { source: "/shop.html", destination: "/shop", permanent: true },
      { source: "/cart.html", destination: "/cart", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/dosing.html", destination: "/dosing", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/login.html", destination: "/login", permanent: true },
    ];
  },
};

export default nextConfig;
