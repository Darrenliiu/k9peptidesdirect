import { redirect } from "next/navigation";
import { noIndexSeo } from "@/lib/seo";

export const metadata = noIndexSeo("Register", "/register");

export default function RegisterPage() {
  redirect("/login?mode=register");
}
