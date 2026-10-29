import { createCoaAction, deleteCoaAction, toggleCoaAction } from "@/app/actions/coas";
import { searchAdminProducts } from "@/lib/catalog";
import { listAdminCoas } from "@/lib/coas";

export default async function AdminCoasPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const products = await searchAdminProducts();
  const rows = await listAdminCoas();
  const blobReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <h1>Certificates of Analysis</h1>
      <p className="lead">
        Upload a PDF or image, link it to a product and lot, then publish it to the public library and
        product page.
      </p>
      {saved ? <p className="pill confirmed">COA saved.</p> : null}
      {!blobReady ? (
        <p className="lead">BLOB_READ_WRITE_TOKEN is missing — uploads will fail until it is set.</p>
      ) : null}

      <form className="panel stack" action={createCoaAction} style={{ marginBottom: 28 }}>
        <h3>Upload a lot file</h3>
        <label>
          Product
          <select name="productId" required defaultValue="">
            <option value="" disabled>
              Choose a product
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.sku}
              </option>
            ))}
          </select>
        </label>
        <div className="grid2">
          <label>
            Batch / lot
            <input name="lot" required placeholder="K9-2610-BPC" />
          </label>
          <label>
            Test date
            <input name="testDate" type="date" />
          </label>
        </div>
        <div className="grid2">
          <label>
            Lab name
            <input name="labName" placeholder="Independent HPLC lab" />
          </label>
          <label>
            Purity %
            <input name="purityPercent" inputMode="decimal" placeholder="99.2" />
          </label>
        </div>
        <label>
          PDF or image
          <input name="file" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" required />
        </label>
        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" name="published" defaultChecked />
          Publish to /coa and the product page
        </label>
        <button className="btn" type="submit">
          Upload COA
        </button>
      </form>

      <table className="plain">
        <tbody>
          <tr>
            <th>Product</th>
            <th>Lot</th>
            <th>Date</th>
            <th>Purity</th>
            <th>Status</th>
            <th />
          </tr>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.product.name}</td>
              <td>
                <a href={row.fileUrl} target="_blank" rel="noopener noreferrer">
                  {row.lot}
                </a>
              </td>
              <td>{row.testDate || "—"}</td>
              <td>{row.purityPercent ? `${row.purityPercent}%` : "—"}</td>
              <td>
                <span className={`pill ${row.published ? "confirmed" : ""}`}>
                  {row.published ? "Published" : "Hidden"}
                </span>
              </td>
              <td style={{ display: "flex", gap: 8 }}>
                <form action={toggleCoaAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="published" value={row.published ? "false" : "true"} />
                  <button className="btn ghost" type="submit">
                    {row.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteCoaAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="btn danger" type="submit">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td colSpan={6}>No COAs uploaded yet. The public library shows a coming-soon state.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}
