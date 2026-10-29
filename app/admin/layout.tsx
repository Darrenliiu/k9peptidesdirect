import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  if (!session) redirect("/login?next=/admin");
  return (
    <>
      <link rel="stylesheet" href="/admin.css" />
      <AdminShell email={session.user.email}>{children}</AdminShell>
    </>
  );
}
