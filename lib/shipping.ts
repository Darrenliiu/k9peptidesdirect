import { and, asc, eq } from "drizzle-orm";
import { getDb, hasDatabase } from "./db";
import { ensureReady } from "./ensure";
import { shippingMethods, shippingZones, storeSettings, type ShippingMethod, type ShippingZone } from "./schema";

export type AddressInput = {
  country: string;
  state: string;
  postalCode?: string;
};

export type QuoteResult = {
  zone: ShippingZone;
  methods: Array<ShippingMethod & { quotedCents: number }>;
};

const FALLBACK_ZONE: ShippingZone = {
  id: "us",
  name: "United States",
  countries: "US",
  states: "",
  enabled: true,
};

const FALLBACK_METHOD: ShippingMethod = {
  id: "us-cold-pack",
  zoneId: "us",
  name: "Cold-pack Ground",
  type: "flat",
  rateCents: 1295,
  freeOverCents: 15000,
  enabled: true,
  sortOrder: 0,
};

export function splitList(value: string | null | undefined) {
  return (value ?? "")
    .split(/[\s,]+/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

function zoneMatches(zone: ShippingZone, address: AddressInput) {
  const countries = splitList(zone.countries);
  const states = splitList(zone.states);
  const country = address.country.trim().toUpperCase();
  const state = address.state.trim().toUpperCase();
  if (countries.length && !countries.includes(country)) return false;
  if (states.length && !states.includes(state)) return false;
  return true;
}

export function quoteMethod(
  method: ShippingMethod,
  subtotalCents: number,
  storeFreeOver?: number | null,
) {
  const threshold = method.freeOverCents ?? storeFreeOver ?? null;
  if (threshold != null && subtotalCents >= threshold) return 0;
  if (method.type === "free_over") return 0;
  return method.rateCents;
}

export async function getSettings() {
  if (!hasDatabase()) {
    return {
      id: "default",
      storeName: "K9 Peptides Direct",
      supportEmail: "support@k9peptidesdirect.com",
      notificationEmail: "support@k9peptidesdirect.com",
      phone: null,
      address: null,
      taxRateBps: 0,
      currency: "USD",
      freeShippingThresholdCents: 15000,
    };
  }
  await ensureReady();
  const db = getDb();
  const [row] = await db.select().from(storeSettings).limit(1);
  return (
    row ?? {
      id: "default",
      storeName: "K9 Peptides Direct",
      supportEmail: "support@k9peptidesdirect.com",
      notificationEmail: "support@k9peptidesdirect.com",
      phone: null,
      address: null,
      taxRateBps: 0,
      currency: "USD",
      freeShippingThresholdCents: 15000,
    }
  );
}

export async function listShipping() {
  if (!hasDatabase()) {
    return { zones: [FALLBACK_ZONE], methods: [FALLBACK_METHOD] };
  }
  await ensureReady();
  const db = getDb();
  const zones = await db.select().from(shippingZones).orderBy(asc(shippingZones.name));
  const methods = await db.select().from(shippingMethods).orderBy(asc(shippingMethods.sortOrder));
  return { zones, methods };
}

export async function quoteShipping(address: AddressInput, subtotalCents: number): Promise<QuoteResult> {
  const settings = await getSettings();
  const { zones, methods } = await listShipping();
  const zone = zones.find((z) => z.enabled && zoneMatches(z, address));
  if (!zone) {
    throw new Error("We do not ship to that location yet.");
  }
  const quoted = methods
    .filter((m) => m.zoneId === zone.id && m.enabled)
    .map((m) => ({
      ...m,
      quotedCents: quoteMethod(m, subtotalCents, settings.freeShippingThresholdCents),
    }));
  if (!quoted.length) {
    throw new Error("No shipping methods are available for that location.");
  }
  return { zone, methods: quoted };
}

export function taxCents(subtotalCents: number, taxRateBps: number) {
  return Math.round((subtotalCents * taxRateBps) / 10000);
}

export { and, eq };
