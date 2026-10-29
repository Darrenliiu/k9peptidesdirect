import { SEED_PRODUCTS, WEIGHTS } from "./catalog-data";
import { getPool, hasDatabase, query } from "./db";
import { SCHEMA_SQL } from "./sql";

let ready: Promise<boolean> | null = null;

async function migrateAndSeed() {
  if (!hasDatabase()) return false;
  await getPool().query(SCHEMA_SQL);

  for (const p of SEED_PRODUCTS) {
    await query(
      `insert into products (
          id, slug, name, sku, category, short_description, description,
          price_cents, sale_price_cents, stock, low_stock_threshold, image,
          status, featured, sort_order, rating, review_count,
          research_overview, dosing, box_contents, coa
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'active',$13,$14,$15,$16,$17,$18,$19,$20)
        on conflict (id) do update set
          slug = excluded.slug,
          name = excluded.name,
          sku = excluded.sku,
          category = excluded.category,
          short_description = excluded.short_description,
          description = excluded.description,
          price_cents = excluded.price_cents,
          sale_price_cents = excluded.sale_price_cents,
          image = excluded.image,
          featured = excluded.featured,
          sort_order = excluded.sort_order,
          rating = excluded.rating,
          review_count = excluded.review_count,
          research_overview = excluded.research_overview,
          dosing = excluded.dosing,
          box_contents = excluded.box_contents,
          coa = excluded.coa,
          updated_at = now()`,
      [
        p.id,
        p.slug,
        p.name,
        p.sku,
        p.category,
        p.shortDescription,
        p.description,
        p.priceCents,
        p.salePriceCents,
        p.stock,
        p.lowStockThreshold,
        p.image,
        p.featured,
        p.sortOrder,
        p.rating,
        p.reviewCount,
        p.researchOverview,
        p.dosing,
        p.boxContents,
        p.coa,
      ],
    );
    for (const [i, weight] of WEIGHTS.entries()) {
      const vid = `${p.id}-${["small", "medium", "large"][i]}`;
      await query(
        `insert into product_variants (id, product_id, name, sku, sort_order)
           values ($1,$2,$3,$4,$5) on conflict (id) do nothing`,
        [vid, p.id, weight, `${p.sku}-${["S", "M", "L"][i]}`, i],
      );
    }
  }

  const zones = await query<{ count: string }>("select count(*)::text as count from shipping_zones");
  if (Number(zones[0]?.count ?? 0) === 0) {
    await query(
      `insert into shipping_zones (id, name, countries, states, enabled)
       values ('us', 'United States', 'US', '', true)`,
    );
    await query(
      `insert into shipping_methods (id, zone_id, name, type, rate_cents, free_over_cents, enabled, sort_order)
       values ('us-cold-pack', 'us', 'Cold-pack Ground', 'flat', 1295, 15000, true, 0)`,
    );
  }

  const settings = await query<{ count: string }>("select count(*)::text as count from store_settings");
  if (Number(settings[0]?.count ?? 0) === 0) {
    await query(
      `insert into store_settings (
        id, store_name, support_email, notification_email, phone, address,
        tax_rate_bps, currency, free_shipping_threshold_cents
      ) values (
        'default', 'K9 Peptides Direct', 'support@k9peptidesdirect.com',
        'support@k9peptidesdirect.com', '', '', 0, 'USD', 15000
      )`,
    );
  }
  return true;
}

export function ensureReady() {
  if (!ready) {
    ready = migrateAndSeed().catch((error) => {
      ready = null;
      console.error("[ensure] database setup failed", error);
      return false;
    });
  }
  return ready;
}
