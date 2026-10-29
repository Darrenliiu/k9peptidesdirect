import { toNextJsHandler } from "better-auth/next-js";
import { readyAuth } from "@/lib/auth";
import { jsonError, originAllowed, rateLimit } from "@/lib/security";

async function handler(request: Request) {
  if (request.method === "POST") {
    if (!originAllowed(request)) return jsonError("Invalid origin", 403);
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!rateLimit(`auth:${ip}`)) return jsonError("Too many attempts. Try again in a minute.", 429);
  }
  const auth = await readyAuth();
  if (!auth) {
    return jsonError(
      "Sign-in is unavailable until DATABASE_URL and BETTER_AUTH_SECRET are configured.",
      503,
    );
  }
  const next = toNextJsHandler(auth);
  if (request.method === "GET") return next.GET(request);
  return next.POST(request);
}

export const GET = handler;
export const POST = handler;
