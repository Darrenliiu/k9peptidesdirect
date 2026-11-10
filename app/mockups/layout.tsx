import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design mockups (preview only)",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function MockupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
