import { NextRequest } from "next/server";
import { configured, exportAuthorized, listSubscribers } from "@/lib/subscribers";

export const dynamic = "force-dynamic";

function csvEscape(value: unknown) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function asPagesReq(request: NextRequest) {
  const url = new URL(request.url);
  return {
    headers: {
      authorization: request.headers.get("authorization") || "",
    },
    query: {
      token: url.searchParams.get("token") || "",
    },
  };
}

export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  if (!process.env.SUBSCRIBERS_EXPORT_TOKEN) {
    return Response.json(
      { ok: false, error: "Export is not configured. Set SUBSCRIBERS_EXPORT_TOKEN on the Vercel project." },
      { status: 503, headers },
    );
  }
  if (!exportAuthorized(asPagesReq(request))) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401, headers });
  }
  if (!configured()) {
    return Response.json({ ok: false, error: "Email storage is not configured." }, { status: 503, headers });
  }

  try {
    const rows = await listSubscribers();
    const format = (new URL(request.url).searchParams.get("format") || "csv").toLowerCase();
    if (format === "json") {
      return Response.json({ ok: true, count: rows.length, subscribers: rows }, { headers });
    }
    const header = "email,source,created_at,label";
    const body = rows
      .map((r) => [r.email, r.source, r.createdAt, r.label || ""].map(csvEscape).join(","))
      .join("\n");
    return new Response(`${header}\n${body}\n`, {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="k9-newsletter-subscribers.csv"',
      },
    });
  } catch (error) {
    console.error("export failed", error);
    return Response.json({ ok: false, error: "Could not export subscribers." }, { status: 500, headers });
  }
}
