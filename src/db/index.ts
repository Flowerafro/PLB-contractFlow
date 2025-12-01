import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema/schema";

export function getDb(env: { DB: D1Database }) {
  if (!env || !env.DB) throw new Error("No D1 database found in env");
  return drizzle(env.DB, { schema });
}

export type DB = DrizzleD1Database<typeof schema>;
