import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

// Export all table definitions
export { clients } from "./tables/clients.table";
export { principals } from "./tables/principals.table";
export { contracts } from "./tables/contracts.table";
export { shipments } from "./tables/shipments.table";
export { invoices } from "./tables/invoices.table";
export { auditLog } from "./audit/audit_log.table";

// Database client setup
const client = createClient({
  url: process.env.DATABASE_URL ?? 'file:./local.db'
});

export const db = drizzle(client);
