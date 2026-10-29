import type { ReactNode } from "react";
import { extractToc, slugifyHeading } from "./blog";

function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "https:" || url.protocol === "http:") return href;
  } catch {
    return null;
  }
  return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+?\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyPrefix}-b-${i++}`}>{token.slice(2, -2)}</strong>);
    } else {
      const label = match[2];
      const href = safeHref(match[3]);
      if (href) {
        const external = href.startsWith("http");
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i++}`}
            href={href}
            style={{ color: "var(--blue)" }}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const toc = extractToc(source);
  const used = new Map<string, number>();
  const headingId = (text: string) => {
    let id = slugifyHeading(text);
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    return id;
  };

  const blocks = source.trim().split(/\n{2,}/);
  const out: ReactNode[] = [];

  blocks.forEach((raw, bi) => {
    const block = raw.trim();
    if (!block) return;

    if (block.startsWith("> ")) {
      const text = block
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      out.push(
        <aside key={`c-${bi}`} className="blog-note">
          {renderInline(text, `c-${bi}`)}
        </aside>,
      );
      return;
    }

    const h2 = /^##\s+(.+)$/.exec(block);
    if (h2) {
      const text = h2[1].trim();
      out.push(
        <h2 key={`h2-${bi}`} id={headingId(text)}>
          {text}
        </h2>,
      );
      return;
    }
    const h3 = /^###\s+(.+)$/.exec(block);
    if (h3) {
      const text = h3[1].trim();
      out.push(
        <h3 key={`h3-${bi}`} id={headingId(text)}>
          {text}
        </h3>,
      );
      return;
    }

    const lines = block.split("\n");
    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      out.push(
        <ul key={`ul-${bi}`}>
          {lines.map((l, li) => (
            <li key={li}>{renderInline(l.replace(/^[-*]\s+/, ""), `ul-${bi}-${li}`)}</li>
          ))}
        </ul>,
      );
      return;
    }
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      out.push(
        <ol key={`ol-${bi}`}>
          {lines.map((l, li) => (
            <li key={li}>{renderInline(l.replace(/^\d+\.\s+/, ""), `ol-${bi}-${li}`)}</li>
          ))}
        </ol>,
      );
      return;
    }

    out.push(
      <p key={`p-${bi}`}>{renderInline(block.replace(/\n/g, " "), `p-${bi}`)}</p>,
    );
  });

  return (
    <div className="blog-prose">
      {out}
      <span className="sr-only" data-toc-count={toc.length} />
    </div>
  );
}
