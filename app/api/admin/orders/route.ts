import { listOrders } from "@/lib/orders";
import { jsonError, originAllowed } from "@/lib/security";
import { requireAdmin } from "@/lib/session";

export async function GET(request: Request) {
  if (!originAllowed(request)) return jsonError("Invalid origin", 403);
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);
  const url = new URL(request.url);
  const rows = await listOrders({
    q: url.searchParams.get("q") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
  });
  return Response.json({ orders: rows });
}
