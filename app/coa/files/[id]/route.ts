import { NextResponse } from "next/server";
import { getPublishedCoa, streamCoaFile } from "@/lib/coas";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coa = await getPublishedCoa(id);
  if (!coa) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }
  const download = new URL(request.url).searchParams.has("download");
  const body = await streamCoaFile(coa, { download, index: !download });
  if (!body) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }
  return body;
}
