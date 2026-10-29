export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

export function isAdminUser(user?: { email?: string | null; role?: string | null } | null) {
  if (!user) return false;
  return user.role === "admin" || isAdminEmail(user.email);
}
