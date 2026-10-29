import type { Metadata } from "next";
import { Reveal } from "@/components/storefront/Reveal";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://k9peptidesdirect.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "K9 Peptides Direct", template: "%s | K9 Peptides Direct" },
  description:
    "Research-grade peptides formulated and dosed for canine wellness. Lab-verified, vet-informed.",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
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
