export function Paw({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="#087cf0" aria-hidden>
      <circle cx="5" cy="9" r="2.4" />
      <circle cx="9.5" cy="4.5" r="2.4" />
      <circle cx="14.5" cy="4.5" r="2.4" />
      <circle cx="19" cy="9" r="2.4" />
      <path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className="logo" href="/" style={light ? { color: "#fff" } : undefined}>
      <Paw />
      {light ? (
        <>
          K9 Peptides<b>Direct</b>
        </>
      ) : (
        <span>
          K9 Peptides <b>Direct</b>
        </span>
      )}
    </a>
  );
}
