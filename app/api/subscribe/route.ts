import { NextRequest } from "next/server";
import {
  checkRateLimit,
  configured,
  hashIp,
  isAllowedSource,
  isValidEmail,
  normalizeEmail,
  saveSubscriber,
} from "@/lib/subscribers";

export const dynamic = "force-dynamic";

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function wantsHtml(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const type = request.headers.get("content-type") || "";
  return accept.includes("text/html") && !type.includes("application/json");
}

function send(request: NextRequest, status: number, payload: Record<string, unknown>) {
  if (wantsHtml(request)) {
    const ok = Boolean(payload.ok);
    const title = ok ? "You are on the list" : "Please try again";
    const msg = ok
      ? payload.status === "already"
        ? "You are already on the K9 Peptides Direct newsletter list."
        : "You are on the list. We write when there is a restock, a new product, or a research note worth opening."
      : String(payload.error || "Something went wrong.");
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | K9 Peptides Direct</title><link rel="stylesheet" href="/style.css"></head><body><section class="sec"><div class="w"><h1>${title}</h1><p>${msg}</p><p><a class="btn n" href="/">Back to home</a></p></div></section></body></html>`,
      {
        status,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      },
    );
  }
  return Response.json(payload, { status, headers: { "Cache-Control": "no-store" } });
}

async function parseBody(request: NextRequest) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS", "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!configured()) {
    return send(request, 503, {
      ok: false,
      error: "Signup is temporarily unavailable.",
      code: "unavailable",
    });
  }

  const body = await parseBody(request);
  if (String(body.company || "").trim()) {
    return send(request, 200, { ok: true, status: "subscribed" });
  }

  const email = normalizeEmail(body.email);
  const source = String(body.source || "").trim();
  if (!isValidEmail(email)) {
    return send(request, 400, { ok: false, error: "Please enter a valid email.", code: "invalid" });
  }
  if (!isAllowedSource(source)) {
    return send(request, 400, { ok: false, error: "Please try again.", code: "invalid" });
  }

  const ipHash = hashIp(clientIp(request));
  try {
    const rate = await checkRateLimit(ipHash);
    if (!rate.ok) {
      return send(request, 429, {
        ok: false,
        error: "Please wait a few minutes and try again.",
        code: "rate",
      });
    }
    const result = await saveSubscriber({
      email,
      source,
      ipHash,
      userAgent: request.headers.get("user-agent"),
    });
    return send(request, 200, { ok: true, status: result.status });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (/already exists|already_exists|overwrite/i.test(msg)) {
      return send(request, 200, { ok: true, status: "already" });
    }
    console.error("subscribe failed", msg);
    return send(request, 500, {
      ok: false,
      error: "Something went wrong. Please try again.",
      code: "server",
    });
  }
}
