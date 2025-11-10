// import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/d1';
// Export all table definitions
export { clients } from "./tables/clients.table";
export { principals } from "./tables/principals.table";
export { contracts } from "./tables/contracts.table";
export { shipments } from "./tables/shipments.table";
export { invoices } from "./tables/invoices.table";
export { auditLog } from "./audit/audit_log.table";

// Database client setup for Cloudflare Worker environment
declare global {
  var DB: D1Database | undefined;
}

let dbInstance: any = null;

function getDbInstance() {
  if (dbInstance) return dbInstance;

  // Check if we're in a Cloudflare Worker environment
  if (typeof globalThis !== 'undefined' && globalThis.DB) {
    console.log('Using Cloudflare D1 database');
    dbInstance = drizzle(globalThis.DB);
    return dbInstance;
  }

  console.warn('DB is not defined. Creating mock database for development.');

  // Return a mock database that returns empty results instead of throwing errors
  dbInstance = {
    select: (fields: any) => ({
      from: (table: any) => ({
        leftJoin: (table: any, condition: any) => ({
          leftJoin: (table: any, condition: any) => ({
            leftJoin: (table: any, condition: any) => ({
              leftJoin: (table: any, condition: any) => ({
                where: (condition: any) => ({
                  orderBy: (order: any) => Promise.resolve([])
                })
              })
            })
          })
        }),
        where: (condition: any) => ({
          orderBy: (order: any) => Promise.resolve([])
        }),
        orderBy: (order: any) => Promise.resolve([])
      })
    }),
    insert: (table: any) => ({
      values: (values: any) => Promise.resolve({ success: true, insertedId: 1 })
    }),
    update: (table: any) => ({
      set: (values: any) => ({
        where: (condition: any) => Promise.resolve({ success: true })
      })
    }),
    delete: (table: any) => ({
      where: (condition: any) => Promise.resolve({ success: true })
    })
  };

  return dbInstance;
}

export const db = getDbInstance();
