import { headers } from "next/headers";
import { readyAuth } from "./auth";
import { isAdminUser } from "./roles";

export async function getSession() {
  const auth = await readyAuth();
  if (!auth) return null;
  return auth.api.getSession({ headers: await headers() });
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) return null;
  return session;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || !isAdminUser(session.user)) return null;
  return session;
}
