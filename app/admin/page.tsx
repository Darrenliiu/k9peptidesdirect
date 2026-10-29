import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { dashboardStats, listOrders, statusLabel } from "@/lib/orders";
import { products } from "@/lib/schema";

export default async function AdminHome() {
  const stats = await dashboardStats();
  const recent = await listOrders({});
  const db = getDb();
  const low = await db
    .select()
    .from(products)
    .where(eq(products.status, "active"))
    .orderBy(products.stock);

  const lowStock = low.filter((p) => p.stock <= p.lowStockThreshold).slice(0, 8);

  return (
    <>
      <h1>Dashboard</h1>
      <p className="lead">Sales, open work, and inventory that needs attention.</p>
      <div className="kpis">
        <div className="kpi">
          <b>{formatMoney(stats.revenue)}</b>
          <span>Paid revenue</span>
        </div>
        <div className="kpi">
          <b>{stats.orders_30}</b>
          <span>Orders · 30 days</span>
        </div>
        <div className="kpi">
          <b>{stats.requested}</b>
          <span>Requested</span>
        </div>
        <div className="kpi">
          <b>{stats.open_orders}</b>
          <span>Open orders</span>
        </div>
        <div className="kpi">
          <b>{lowStock.length}</b>
          <span>Low-stock SKUs</span>
        </div>
      </div>
      <div className="grid2">
        <div className="panel">
          <h3>Recent orders</h3>
          <table className="plain">
            <tbody>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
              {recent.slice(0, 8).map((o) => (
                <tr key={o.id}>
                  <td>
                    <a href={`/admin/orders/${o.id}`}>{o.number}</a>
                  </td>
                  <td>{o.email}</td>
                  <td>
                    <span className={`pill ${o.status}`}>{statusLabel(o.status)}</span>
                  </td>
                  <td>{formatMoney(o.totalCents)}</td>
                </tr>
              ))}
              {!recent.length ? (
                <tr>
                  <td colSpan={4}>No orders yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Low stock</h3>
          <table className="plain">
            <tbody>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty</th>
              </tr>
              {lowStock.map((p) => (
                <tr key={p.id}>
                  <td>
                    <a href={`/admin/products/${p.id}`}>{p.name}</a>
                  </td>
                  <td>{p.sku}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
              {!lowStock.length ? (
                <tr>
                  <td colSpan={3}>Inventory looks healthy.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
