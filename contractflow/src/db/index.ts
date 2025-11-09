// import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/d1';
// Export all table definitions
export { clients } from "./tables/clients.table";
export { principals } from "./tables/principals.table";
export { contracts } from "./tables/contracts.table";
export { shipments } from "./tables/shipments.table";
export { invoices } from "./tables/invoices.table";
export { auditLog } from "./audit/audit_log.table";

/*
// Database client setup
const client = createClient({
  url: process.env.DATABASE_URL ?? 'file:./local.db'
});

export const db = drizzle(client);
*/

// Database client setup for Cloudflare Worker environment
declare global {
  var DB: D1Database;
}

let db: any;
export function getDbInstance() {
  if (typeof DB !== 'undefined') {
    db = drizzle(DB);
  }

  console.warn('DB is not defined. Ensure this code runs in a Cloudflare Worker environment with D1 database binding.');

  db = {
    select: () => {
      throw new Error("DB is not initialized.");
    }
  }
}

export {db};
