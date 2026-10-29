export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <>
      <h1>Billing</h1>
      <p>
        Card numbers are never stored on this site. When Stripe is connected, you&apos;ll manage saved
        cards in Stripe&apos;s customer portal.
      </p>
      <p className="disc">
        Right now checkout uses a test/stub payment so you can place and track orders without
        entering card data.
      </p>
    </>
  );
}
