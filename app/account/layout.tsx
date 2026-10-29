import { noIndexSeo } from "@/lib/seo";
import { redirect } from "next/navigation";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { signOutAction } from "@/app/actions/auth";
import { isAdminUser } from "@/lib/roles";
import { requireUser } from "@/lib/session";

export const metadata = noIndexSeo("Account", "/account");

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();
  if (!session) redirect("/login?next=/account");
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w pd">
          <aside>
            <h2>Your account</h2>
            <p>{session.user.email}</p>
            <p>
              <a href="/account">Overview</a>
              <br />
              <a href="/account/orders">Orders</a>
              <br />
              <a href="/account/addresses">Addresses</a>
              <br />
              <a href="/account/billing">Billing</a>
              {isAdminUser(session.user) ? (
                <>
                  <br />
                  <a href="/admin">Admin</a>
                </>
              ) : null}
            </p>
            <form action={signOutAction}>
              <button className="btn n" type="submit">
                Sign out
              </button>
            </form>
          </aside>
          <div>{children}</div>
        </div>
      </section>
      <Footer />
    </>
  );
}
