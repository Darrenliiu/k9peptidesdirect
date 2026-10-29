import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";
import { CartClient } from "./ui";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <>
      <Header />
      <CartClient />
      <Footer />
    </>
  );
}
