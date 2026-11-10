export function PawMark({ size = 26, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <circle cx="5" cy="9" r="2.4" />
      <circle cx="9.5" cy="4.5" r="2.4" />
      <circle cx="14.5" cy="4.5" r="2.4" />
      <circle cx="19" cy="9" r="2.4" />
      <path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z" />
    </svg>
  );
}

export function MockBanner({ label }: { label: string }) {
  return (
    <div
      className="mk-pill"
      style={{
        position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        background: "rgba(10,14,30,.88)", color: "#fff", font: "500 12px/1.2 system-ui, sans-serif",
        padding: "8px 14px", borderRadius: 999, display: "flex", gap: 10, alignItems: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)", whiteSpace: "nowrap",
      }}
    >
      <span>Design mockup · {label}</span>
      <a href="/mockups" style={{ color: "#8cc4ff", textDecoration: "underline" }}>All directions</a>
    </div>
  );
}
