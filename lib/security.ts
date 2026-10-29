import { NextRequest } from "next/server";

export function originAllowed(request: Request | NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  try {
    const url = new URL(origin);
    if (host && url.host === host) return true;
    if (url.hostname.endsWith(".vercel.app")) return true;
    if (url.hostname === "k9peptidesdirect.com" || url.hostname === "www.k9peptidesdirect.com") {
      return true;
    }
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
  } catch {
    return false;
  }
  return false;
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

const attempts = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max = 8, windowMs = 60_000) {
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || row.reset < now) {
    attempts.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  row.count += 1;
  return row.count <= max;
}
