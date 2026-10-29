export function PawPattern() {
  return (
    <svg
      className="nl-defs"
      aria-hidden="true"
      width="0"
      height="0"
      focusable="false"
    >
      <defs>
        <pattern
          id="nl-paws"
          width="92"
          height="80"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-12)"
        >
          <g fill="currentColor">
            <g transform="translate(8,8) rotate(-14 12 12)">
              <circle cx="5" cy="9" r="2.4" />
              <circle cx="9.5" cy="4.5" r="2.4" />
              <circle cx="14.5" cy="4.5" r="2.4" />
              <circle cx="19" cy="9" r="2.4" />
              <path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z" />
            </g>
            <g transform="translate(54,12) rotate(10 12 12)">
              <circle cx="5" cy="9" r="2.4" />
              <circle cx="9.5" cy="4.5" r="2.4" />
              <circle cx="14.5" cy="4.5" r="2.4" />
              <circle cx="19" cy="9" r="2.4" />
              <path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z" />
            </g>
            <g transform="translate(31,48) rotate(-8 12 12)">
              <circle cx="5" cy="9" r="2.4" />
              <circle cx="9.5" cy="4.5" r="2.4" />
              <circle cx="14.5" cy="4.5" r="2.4" />
              <circle cx="19" cy="9" r="2.4" />
              <path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z" />
            </g>
          </g>
        </pattern>
      </defs>
    </svg>
  );
}

function PawBg() {
  return (
    <div className="nl-bg" aria-hidden="true">
      <svg className="nl-bg-art" focusable="false">
        <rect width="100%" height="100%" fill="url(#nl-paws)" />
      </svg>
    </div>
  );
}

export function NewsletterForm({
  source,
  id,
  submitLabel,
}: {
  source: "cta" | "footer" | "popup" | "coa";
  id: string;
  submitLabel: string;
}) {
  return (
    <form className="nl-form" action="/api/subscribe" method="post" data-nl={source} noValidate>
      <input type="hidden" name="source" value={source} />
      <label className="nl-hp">
        <span>Company</span>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="nl-row">
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          spellCheck={false}
        />
        <button className="btn" type="submit">
          {submitLabel}
        </button>
      </div>
      <p className="nl-status" role="status" aria-live="polite" />
    </form>
  );
}

export function NewsletterCta() {
  return (
    <section className="sec nl-cta" aria-labelledby="nl-cta-h">
      <PawBg />
      <div className="w nl-cta-box">
        <div>
          <span className="tag">Newsletter</span>
          <h2 id="nl-cta-h">Stay close to restocks and research notes</h2>
          <p>
            The occasional email when we add a product, restock a favorite, or publish a protocol
            guide. No daily noise.
          </p>
        </div>
        <NewsletterForm source="cta" id="nl-cta-email" submitLabel="Subscribe" />
      </div>
    </section>
  );
}

export function NewsletterPopup() {
  return (
    <div className="nl-pop" hidden>
      <div className="nl-pop-back" data-nl-close tabIndex={-1} />
      <div className="nl-pop-card" role="dialog" aria-modal="true" aria-labelledby="nl-pop-h">
        <PawBg />
        <button className="nl-x" type="button" aria-label="Close" data-nl-close>
          &times;
        </button>
        <span className="tag">Newsletter</span>
        <h2 id="nl-pop-h">A quieter way to keep up</h2>
        <p>
          Restocks, new products, and the occasional research note. We write when there is something
          worth opening.
        </p>
        <NewsletterForm source="popup" id="nl-pop-email" submitLabel="Subscribe" />
      </div>
    </div>
  );
}
