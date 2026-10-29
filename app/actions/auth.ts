"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { readyAuth } from "@/lib/auth";

export async function signOutAction() {
  const auth = await readyAuth();
  if (auth) {
    await auth.api.signOut({ headers: await headers() });
  }
  redirect("/login");
}
