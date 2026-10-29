import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <>
      <h1>New product</h1>
      <p className="lead">Published products appear on the storefront immediately.</p>
      <ProductForm />
    </>
  );
}
