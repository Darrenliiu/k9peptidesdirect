"use client";

import { useEffect, useState } from "react";

export function PaymentStatus({ order, initial }: { order: string; initial: string }) {
  const [status, setStatus] = useState(initial);
  useEffect(() => {
    if (status === "paid") return;
    let tries = 0;
    const t = setInterval(async () => {
      tries += 1;
      try {
        const r = await fetch(`/api/orders/status?order=${encodeURIComponent(order)}`, { cache: "no-store" });
        if (r.ok) {
          const j = (await r.json()) as { paymentStatus: string };
          setStatus(j.paymentStatus);
          if (j.paymentStatus === "paid") clearInterval(t);
        }
      } catch {}
      if (tries > 120) clearInterval(t);
    }, 5000);
    return () => clearInterval(t);
  }, [order, status]);

  if (status === "paid") {
    return (
      <>
        <h1>Payment received</h1>
        <p>
          Thank you. Order <b>{order}</b> is paid and confirmed. We will email you when it ships.
        </p>
      </>
    );
  }
  if (status === "failed") {
    return (
      <>
        <h1>Payment not completed</h1>
        <p>
          We have not received payment for order <b>{order}</b>. If you already paid, open the support chat on
          the Peer Pay checkout or contact us with your order number.
        </p>
      </>
    );
  }
  return (
    <>
      <h1>Payment processing</h1>
      <p>
        Order <b>{order}</b> is waiting for payment confirmation from Peer Pay. This page updates automatically
        once your payment settles; it can take a few minutes.
      </p>
    </>
  );
}
