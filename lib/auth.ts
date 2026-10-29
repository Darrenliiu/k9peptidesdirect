import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb, hasDatabase } from "./db";
import { ensureReady } from "./ensure";
import { isAdminEmail } from "./roles";
import * as schema from "./schema";
import { query } from "./db";

function createAuth() {
  if (!hasDatabase() || !process.env.BETTER_AUTH_SECRET) {
    return null;
  }
  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
        rateLimit: schema.rateLimit,
      },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
      "https://k9peptidesdirect.com",
      "https://www.k9peptidesdirect.com",
      "https://*.vercel.app",
      "http://localhost:3000",
    ],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "customer",
          input: false,
        },
      },
    },
    session: {
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 8,
    },
    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
    },
    databaseHooks: {
      user: {
        create: {
          async before(u) {
            return {
              data: {
                ...u,
                role: isAdminEmail(u.email) ? "admin" : "customer",
              },
            };
          },
          async after(u) {
            try {
              await query(
                `update orders set user_id = $1
                 where lower(email) = lower($2) and user_id is null`,
                [u.id, u.email],
              );
            } catch (error) {
              console.error("[auth] guest order link failed", error);
            }
          },
        },
      },
    },
    plugins: [nextCookies()],
  });
}

let authInstance: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  if (authInstance === undefined) {
    authInstance = createAuth();
  }
  return authInstance;
}

export async function readyAuth() {
  if (!hasDatabase() || !process.env.BETTER_AUTH_SECRET) return null;
  await ensureReady();
  return getAuth();
}
