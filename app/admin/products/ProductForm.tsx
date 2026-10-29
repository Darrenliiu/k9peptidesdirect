import { saveProductAction } from "@/app/actions/admin";
import { CATEGORIES } from "@/lib/catalog-data";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductForm({ product }: { product?: CatalogProduct | null }) {
  async function action(formData: FormData) {
    "use server";
    const result = await saveProductAction(formData);
    const { redirect } = await import("next/navigation");
    redirect(`/admin/products/${result.id}`);
  }

  return (
    <form className="panel stack" action={action}>
      <input type="hidden" name="id" defaultValue={product?.id} />
      <label>
        Name
        <input name="name" required defaultValue={product?.name} />
      </label>
      <div className="grid2">
        <label>
          Slug
          <input name="slug" defaultValue={product?.slug} />
        </label>
        <label>
          SKU
          <input name="sku" defaultValue={product?.sku} />
        </label>
      </div>
      <div className="grid2">
        <label>
          Category
          <select name="category" defaultValue={product?.category ?? "Recovery"}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue={product?.status ?? "active"}>
            <option value="active">active</option>
            <option value="archived">archived</option>
          </select>
        </label>
      </div>
      <div className="grid2">
        <label>
          Price
          <input name="price" type="number" step="0.01" defaultValue={((product?.priceCents ?? 0) / 100).toFixed(2)} />
        </label>
        <label>
          Sale price
          <input
            name="salePrice"
            type="number"
            step="0.01"
            defaultValue={product?.salePriceCents ? (product.salePriceCents / 100).toFixed(2) : ""}
          />
        </label>
      </div>
      <div className="grid2">
        <label>
          Stock
          <input name="stock" type="number" defaultValue={product?.stock ?? 0} />
        </label>
        <label>
          Low-stock threshold
          <input name="lowStockThreshold" type="number" defaultValue={product?.lowStockThreshold ?? 8} />
        </label>
      </div>
      <label>
        Image path
        <input name="image" defaultValue={product?.image ?? "/images/bpc-157.webp"} />
      </label>
      <label>
        Short description
        <input name="shortDescription" defaultValue={product?.shortDescription} />
      </label>
      <label>
        Description
        <textarea name="description" rows={4} defaultValue={product?.description} />
      </label>
      <label>
        Research overview
        <textarea name="researchOverview" rows={3} defaultValue={product?.researchOverview ?? ""} />
      </label>
      <label>
        What&apos;s in the box
        <input name="boxContents" defaultValue={product?.boxContents ?? ""} />
      </label>
      <label>
        COA
        <input name="coa" defaultValue={product?.coa ?? ""} />
      </label>
      <label>
        <input type="checkbox" name="featured" defaultChecked={product?.featured} /> Featured on home
      </label>
      <label>
        Sort order
        <input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 99} />
      </label>
      <button className="btn" type="submit">
        Save product
      </button>
    </form>
  );
}
