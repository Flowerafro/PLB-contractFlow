import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema/schema";


export function getDb(env?: any): DrizzleD1Database<typeof schema> {
  // Try to get DB from global context (set by worker)
  if (globalThis.DB) {
    return drizzle(globalThis.DB, { schema });
  }
  
  // Try to get DB from env parameter
  if (env?.DB) {
    return drizzle(env.DB, { schema });
  }
  
  // Fallback to mock for development
  console.warn('Using mock database - real D1 not available');
  return drizzle(mockDB, { schema });
}

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


export type DB = DrizzleD1Database<typeof schema>;

export { schema };