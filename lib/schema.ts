import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("customer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const rateLimit = pgTable("rate_limit", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  count: integer("count").notNull(),
  lastRequest: integer("last_request").notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull().default(""),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  salePriceCents: integer("sale_price_cents"),
  stock: integer("stock").notNull().default(0),
  lowStockThreshold: integer("low_stock_threshold").notNull().default(8),
  image: text("image").notNull(),
  status: text("status").notNull().default("active"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  rating: text("rating").default("5.0"),
  reviewCount: integer("review_count").default(0),
  researchOverview: text("research_overview"),
  dosing: text("dosing"),
  boxContents: text("box_contents"),
  coa: text("coa"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sku: text("sku"),
  priceCents: integer("price_cents"),
  stock: integer("stock"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const addresses = pgTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("shipping"),
  firstName: text("first_name").notNull().default(""),
  lastName: text("last_name").notNull().default(""),
  company: text("company"),
  line1: text("line1").notNull(),
  line2: text("line2"),
  city: text("city").notNull(),
  state: text("state").notNull().default(""),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull().default("US"),
  phone: text("phone"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const shippingZones = pgTable("shipping_zones", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  countries: text("countries").notNull().default("US"),
  states: text("states").notNull().default(""),
  enabled: boolean("enabled").notNull().default(true),
});

export const shippingMethods = pgTable("shipping_methods", {
  id: text("id").primaryKey(),
  zoneId: text("zone_id")
    .notNull()
    .references(() => shippingZones.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  rateCents: integer("rate_cents").notNull().default(0),
  freeOverCents: integer("free_over_cents"),
  enabled: boolean("enabled").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const storeSettings = pgTable("store_settings", {
  id: text("id").primaryKey().default("default"),
  storeName: text("store_name").notNull().default("K9 Peptides Direct"),
  supportEmail: text("support_email").notNull().default("support@k9peptidesdirect.com"),
  notificationEmail: text("notification_email"),
  phone: text("phone"),
  address: text("address"),
  taxRateBps: integer("tax_rate_bps").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  freeShippingThresholdCents: integer("free_shipping_threshold_cents").default(15000),
});

export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),
    number: text("number").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    email: text("email").notNull(),
    status: text("status").notNull().default("pending"),
    paymentStatus: text("payment_status").notNull().default("unpaid"),
    paymentProvider: text("payment_provider"),
    paymentRef: text("payment_ref"),
    subtotalCents: integer("subtotal_cents").notNull(),
    shippingCents: integer("shipping_cents").notNull(),
    taxCents: integer("tax_cents").notNull(),
    discountCents: integer("discount_cents").notNull().default(0),
    totalCents: integer("total_cents").notNull(),
    shippingMethod: text("shipping_method"),
    trackingNumber: text("tracking_number"),
    trackingCarrier: text("tracking_carrier"),
    shippingAddress: jsonb("shipping_address").notNull(),
    billingAddress: jsonb("billing_address"),
    customerNote: text("customer_note"),
    dogName: text("dog_name"),
    dogWeight: text("dog_weight"),
    contactMethod: text("contact_method"),
    vetConfirmed: boolean("vet_confirmed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("orders_number_idx").on(t.number)],
);

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id"),
  variantId: text("variant_id"),
  name: text("name").notNull(),
  variantName: text("variant_name"),
  sku: text("sku"),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  image: text("image"),
});

export const orderNotes = pgTable("order_notes", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  authorId: text("author_id"),
  authorName: text("author_name"),
  body: text("body").notNull(),
  isCustomerVisible: boolean("is_customer_visible").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Address = typeof addresses.$inferSelect;
export type ShippingZone = typeof shippingZones.$inferSelect;
export type ShippingMethod = typeof shippingMethods.$inferSelect;
export type StoreSettings = typeof storeSettings.$inferSelect;
export type OrderNote = typeof orderNotes.$inferSelect;
export type UserRow = typeof user.$inferSelect;
