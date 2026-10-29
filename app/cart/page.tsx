import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { CartClient } from "./ui";

import { noIndexSeo } from "@/lib/seo";

export const metadata = noIndexSeo("Cart", "/cart");

export default function CartPage() {
  return (
    <>
      <Header />
      <CartClient />
      <Footer />
    </>
  );
}
