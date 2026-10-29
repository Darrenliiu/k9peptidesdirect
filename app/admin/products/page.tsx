import { archiveProductAction } from "@/app/actions/admin";
import { searchAdminProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export default async function AdminProducts({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const rows = await searchAdminProducts(q);
  return (
    <>
      <h1>Products</h1>
      <p className="lead">The live storefront reads this catalog.</p>
      <form className="filters" method="get">
        <input name="q" placeholder="Search name, SKU, category" defaultValue={q} />
        <button className="btn" type="submit">
          Search
        </button>
        <a className="btn ghost" href="/admin/products/new">
          New product
        </a>
      </form>
      <table className="plain">
        <tbody>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th />
          </tr>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <a href={`/admin/products/${p.id}`}>{p.name}</a>
              </td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>{formatMoney(p.salePriceCents ?? p.priceCents)}</td>
              <td>{p.stock}</td>
              <td>
                <span className="pill">{p.status}</span>
              </td>
              <td>
                {p.status === "active" ? (
                  <form action={archiveProductAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="btn ghost" type="submit">
                      Archive
                    </button>
                  </form>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
