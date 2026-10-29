import type { Crumb } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.path}>
            {i > 0 ? <span aria-hidden="true"> / </span> : null}
            {last ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.path}>{item.name}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
