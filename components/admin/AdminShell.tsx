"use client";

import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";

const LINKS = [
  ["/admin", "Dashboard"],
  ["/admin/orders", "Orders"],
  ["/admin/products", "Products"],
  ["/admin/customers", "Customers"],
  ["/admin/shipping", "Shipping"],
  ["/admin/settings", "Settings"],
];

export function AdminShell({ email, children }: { email?: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="admin">
      <aside className="aside">
        <h1>K9 Back office</h1>
        <nav>
          {LINKS.map(([href, label]) => {
            const on = href === "/admin" ? path === "/admin" : path.startsWith(href);
            return (
              <a key={href} href={href} className={on ? "on" : ""}>
                {label}
              </a>
            );
          })}
        </nav>
        <p style={{ marginTop: 28, fontSize: 12, color: "#86868b" }}>{email}</p>
        <form action={signOutAction}>
          <button className="btn ghost" type="submit" style={{ marginTop: 10, color: "#111" }}>
            Sign out
          </button>
        </form>
        <p style={{ marginTop: 24 }}>
          <a href="/">View storefront</a>
        </p>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
