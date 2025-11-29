import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema/schema";

export function getDb(env: { DB: D1Database }) {
  if (!env || !env.DB) throw new Error("No D1 database found in env");
  return drizzle(env.DB, { schema });
}

export type DB = DrizzleD1Database<typeof schema>;
export { schema };
/*
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema/schema";

// For development/fallback when DB is not available
const mockDB = {
  exec: () => ({ results: [], success: true, meta: {} }),
  prepare: () => ({
    bind: () => ({
      all: () => ({ results: [] }),
      run: () => ({ success: true }),
      first: () => null,
    }),
    all: () => ({ results: [] }),
    run: () => ({ success: true }),
    first: () => null,
  }),
  batch: () => [],
  dump: () => new ArrayBuffer(0),
} as unknown as D1Database;

// Create database instance with fallback
export const db = drizzle(mockDB, { schema });

export function getDb() {
  return db;
}

export type DB = DrizzleD1Database<typeof schema>;

export { schema };
*/