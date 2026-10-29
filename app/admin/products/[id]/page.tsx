import { notFound } from "next/navigation";
import { getProductById } from "@/lib/catalog";
import { ProductForm } from "../ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return (
    <>
      <h1>{product.name}</h1>
      <p className="lead">
        <a href={`/product/${product.slug}`}>View on storefront</a>
      </p>
      <ProductForm product={product} />
    </>
  );
}
