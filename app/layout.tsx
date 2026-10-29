import type { Metadata } from "next";
import { Reveal } from "@/components/storefront/Reveal";
import { DEFAULT_DESCRIPTION, DEFAULT_OG, SITE_NAME, SITE_URL, absUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Research-Grade Canine Peptides`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: absUrl(DEFAULT_OG), alt: "Working dog — K9 Peptides Direct" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [absUrl(DEFAULT_OG)],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
