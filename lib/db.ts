import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema>;

let pool: Pool | null = null;
let dbInstance: Database | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!pool) {
    const connectionString = (process.env.DATABASE_URL ?? "").replace(/^["']|["']$/g, "");
    pool = new Pool({
      connectionString,
      max: 8,
      ssl: { rejectUnauthorized: false },
    });
    try {
      attachDatabasePool(pool);
    } catch {
      // Local Node has no Fluid compute hook.
    }
  }
  return pool;
}

export function getDb(): Database {
  if (!dbInstance) {
    dbInstance = drizzle(getPool(), { schema });
  }
  return dbInstance;
}

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  values: unknown[] = [],
) {
  const result = await getPool().query<T>(text, values);
  return result.rows;
}
