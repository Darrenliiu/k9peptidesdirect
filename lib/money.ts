export function displayPrice(product: { priceCents: number; salePriceCents?: number | null }) {
  return product.salePriceCents ?? product.priceCents;
}

export function formatMoney(cents: number) {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function dollarsToCents(value: string | number) {
  const n = typeof value === "number" ? value : Number.parseFloat(value);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

export function parseAdminPrice(value: FormDataEntryValue | null) {
  if (value == null || value === "") return 0;
  return dollarsToCents(String(value));
}
