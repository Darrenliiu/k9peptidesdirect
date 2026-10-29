import { redirect } from "next/navigation";
import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { isAdminUser } from "@/lib/roles";
import { noIndexSeo } from "@/lib/seo";
import { getSession } from "@/lib/session";
import { AuthForm } from "./ui";

export const metadata = noIndexSeo("Login", "/login");

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; mode?: string }>;
}) {
  const session = await getSession();
  const { next, mode } = await searchParams;
  if (session?.user) {
    redirect(next || (isAdminUser(session.user) ? "/admin" : "/account"));
  }
  return (
    <>
      <Header />
      <section className="sec">
        <div className="w" style={{ maxWidth: 520 }}>
          <h1>{mode === "register" ? "Create account" : "Sign in"}</h1>
          <p>Customers and admins use the same login. You&apos;ll land in the right workspace.</p>
          <AuthForm mode={mode === "register" ? "register" : "login"} next={next} />
        </div>
      </section>
      <Footer />
    </>
  );
}
