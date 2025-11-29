import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { drizzle as d1Drizzle } from 'drizzle-orm/d1';
import * as schema from '../schema/schema';

// Check if we're running in Cloudflare Workers environment
function isCloudflareWorkers(): boolean {
  return typeof (globalThis as any).DB !== 'undefined';
}

// Create appropriate client based on environment
function createDbClient() {
  if (isCloudflareWorkers()) {
    // In Cloudflare Workers, use the D1 binding
    console.log('Using Cloudflare D1 database...');
    return d1Drizzle((globalThis as any).DB, { schema });
  } else {
    // Local development - use LibSQL client
    console.log('Using local LibSQL database...');
    const client = createClient({
      url: process.env.DATABASE_URL ?? 'file:./local.db',
    });
    return drizzle(client, { schema });
  }
}

// PRAGMA settings for local development only
async function initLocalDb() {
  if (!isCloudflareWorkers()) {
    console.log('Configuring local database PRAGMA settings...');
    
    const client = createClient({
      url: process.env.DATABASE_URL ?? 'file:./local.db',
    });
    
    // Enable foreign key constraints (critical for referential integrity)
    await client.execute('PRAGMA foreign_keys = ON');
    
    // Enable WAL mode for better concurrency and performance
    await client.execute('PRAGMA journal_mode = WAL');
    
    // Full synchronous mode for ACID guarantees as specified in report
    await client.execute('PRAGMA synchronous = FULL');
    
    // Optimize query performance
    await client.execute('PRAGMA temp_store = memory');
    await client.execute('PRAGMA mmap_size = 268435456'); // 256MB mmap
    
    console.log('Local database PRAGMA settings configured');
  } else {
    console.log('Cloudflare D1 database ready (PRAGMA settings managed by D1)');
  }
}

export const db = createDbClient();

// For backwards compatibility, export a client (though it won't work with D1)
export const client = isCloudflareWorkers() ? null : createClient({
  url: process.env.DATABASE_URL ?? 'file:./local.db',
});

// Initialize database settings on import
initLocalDb().catch(console.error);