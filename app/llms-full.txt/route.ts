import { listPublishedCoas } from "@/lib/coas";
import { llmsFullTxt } from "@/lib/llms";

export const dynamic = "force-dynamic";

export async function GET() {
  const published = await listPublishedCoas();
  return new Response(llmsFullTxt(published), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
