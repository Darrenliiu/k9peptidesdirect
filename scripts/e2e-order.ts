import "./load-env";
import { createOrder } from "../lib/checkout";
import { getOrder, listOrders } from "../lib/orders";
import { quoteShipping } from "../lib/shipping";

async function main() {
  const over = await quoteShipping({ country: "US", state: "CA" }, 16000);
  const under = await quoteShipping({ country: "US", state: "CA" }, 8000);
  if (over.methods[0].quotedCents !== 0) throw new Error("expected free shipping over $150");
  if (under.methods[0].quotedCents !== 1295) throw new Error("expected $12.95 under threshold");
  try {
    await quoteShipping({ country: "FR", state: "IDF" }, 8000);
    throw new Error("France should be blocked");
  } catch (e) {
    if (!(e instanceof Error) || !e.message.includes("do not ship")) throw e;
  }

  const order = await createOrder({
    email: "guest.owner@example.com",
    lines: [{ productId: "joint-pack", variantId: "joint-pack-medium", quantity: 1 }],
    shipping: {
      firstName: "Jess",
      lastName: "M",
      line1: "100 Bark St",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      country: "US",
      phone: "5125550100",
    },
    dogName: "Scout",
    dogWeight: "42 lb",
    contactMethod: "email",
    vetConfirmed: true,
  });
  if (order.shippingCents !== 0) throw new Error(`expected free ship, got ${order.shippingCents}`);
  if (order.payment.status !== "requested") throw new Error("request provider should not collect payment");
  const loaded = await getOrder(order.id);
  if (!loaded || loaded.items.length !== 1) throw new Error("order items missing");
  if (loaded.status !== "requested") throw new Error("order should start as requested");
  if (loaded.dogName !== "Scout") throw new Error("dog name missing");
  const listed = await listOrders({ q: "guest.owner" });
  if (!listed.length) throw new Error("order list miss");
  console.log("e2e ok", order.number, "total", order.totalCents, "ship", order.shippingCents);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
