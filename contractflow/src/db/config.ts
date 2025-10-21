import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema/schema';

export const client = createClient({
  url: process.env.DATABASE_URL ?? 'file:./local.db',
});

// Initialize database settings
async function initDb() {
  await client.execute('PRAGMA foreign_keys = ON');
  await client.execute('PRAGMA journal_mode = WAL');
  await client.execute('PRAGMA synchronous = FULL');
}

export const db = drizzle(client, { schema });
await initDb().catch(console.error);