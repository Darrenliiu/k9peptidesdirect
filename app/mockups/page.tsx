import { PawMark } from "./shared";

export const metadata = { title: "Design directions (preview only)" };

const DIRS = [
  { href: "/mockups/a", k: "A", name: "Clinical Luxe", img: "/images/hero-dog.webp", bg: "#f7f5f0", fg: "#003366",
    d: "Light, airy and editorial. Cream background, navy type with italic serif accents, a lab-results table and a minimal FAQ.",
    refs: "bluumpeptides.com, puriphi.net, trypeaked.co, doko.md" },
  { href: "/mockups/b", k: "B", name: "Midnight Lab", img: "/images/lab.webp", bg: "#05080f", fg: "#e8eef8",
    d: "Dark, bold and data-forward. Huge headline, glowing vial lineup, ranked product grid, certificate-style proof section and giant wordmark footer.",
    refs: "aminexa.net, prime-scientific.vercel.app, labsourced.com, altrbio.co, evolabsresearch.co" },
  { href: "/mockups/c", k: "C", name: "Pack Life", img: "/images/run.webp", bg: "#fbf6ef", fg: "#1f2a3d",
    d: "Warm and dog-forward. Full-bleed photo hero, color-coded goal cards with soft gradients, a bundle bento grid and friendly rounded shapes.",
    refs: "feelpeptides.com, trypeaked.co, altrbio.co, puriphi.net" },
];

export default function MockupsIndex() {
  return (
    <main style={{ fontFamily: "Outfit, system-ui, sans-serif", background: "#f6f8fb", minHeight: "100vh", padding: "48px 20px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <p style={{ display: "flex", gap: 8, alignItems: "center", color: "#087cf0", fontWeight: 600, margin: 0 }}>
          <PawMark size={22} color="#087cf0" /> K9 Peptides Direct · Homepage design directions
        </p>
        <h1 style={{ color: "#003366", margin: "12px 0 6px" }}>Pick a direction</h1>
        <p style={{ color: "#5b6478", maxWidth: 680, marginTop: 0 }}>
          Preview-only mockups. They use real products, prices and images from the store, they don&apos;t take orders,
          and they aren&apos;t indexed by search engines. Links inside go to the current live pages.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, marginTop: 30 }}>
          {DIRS.map((x) => (
            <a key={x.k} href={x.href} style={{ background: x.bg, color: x.fg, borderRadius: 22, overflow: "hidden", border: "1px solid #dde3ec", display: "block" }}>
              <img src={x.img} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              <div style={{ padding: 22 }}>
                <h2 style={{ color: "inherit", margin: 0, fontSize: 26 }}>{x.k} · {x.name}</h2>
                <p style={{ opacity: 0.8 }}>{x.d}</p>
                <p style={{ fontSize: 13, opacity: 0.6 }}>Inspired by: {x.refs}</p>
                <span style={{ fontWeight: 600, color: "#087cf0" }}>Open mockup →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
