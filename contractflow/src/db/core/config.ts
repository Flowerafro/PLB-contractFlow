import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../schema/schema';

export const client = createClient({
    url: process.env.DATABASE_URL ?? 'libsql://plb-contractflow-db.d1.sqlite.io',
    authToken: process.env.DATABASE_AUTH_TOKEN ?? 'mBJbEafyspFhAf6hOQ1nyfXyWAd6yI6clAjWH4GC'
});

// PRAGMA settings for ACID compliance 
async function initDb() {
  console.log('Configuring database PRAGMA settings...');
  
  // Enable foreign key constraints (critical for referential integrity)
  await client.execute('PRAGMA foreign_keys = ON');
  
  // Enable WAL mode for better concurrency and performance
  await client.execute('PRAGMA journal_mode = WAL');
  
  // Full synchronous mode for ACID guarantees
  await client.execute('PRAGMA synchronous = FULL');
  
  // Optimize query performance
  await client.execute('PRAGMA temp_store = memory');
  await client.execute('PRAGMA mmap_size = 268435456'); // 256MB mmap
  
  console.log('Database PRAGMA settings configured');
}

export const db = drizzle(client, { schema });

// Initialize database settings on import
initDb().catch(console.error);