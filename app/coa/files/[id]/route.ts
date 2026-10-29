import { NextResponse } from "next/server";
import { getPublishedCoa } from "@/lib/coas";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coa = await getPublishedCoa(id);
  if (!coa) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }
  return NextResponse.redirect(coa.fileUrl, 302);
}
