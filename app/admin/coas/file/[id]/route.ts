import { NextResponse } from "next/server";
import { getAdminCoa, streamCoaFile } from "@/lib/coas";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "X-Robots-Tag": "noindex" } });
  }
  const { id } = await params;
  const coa = await getAdminCoa(id);
  if (!coa) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }
  const download = new URL(request.url).searchParams.has("download");
  const body = await streamCoaFile(coa, { download, index: false });
  if (!body) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }
  return body;
}
