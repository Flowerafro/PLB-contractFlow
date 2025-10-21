import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dbPath = join(__dirname, '../../local.db');

const client = createClient({
  url: process.env.DATABASE_URL ?? `file:${dbPath}`
});

const db = drizzle(client);

async function main() {
  try {
    console.log('Running migrations...');
    await migrate(db, {
      migrationsFolder: join(__dirname, 'migrations'), // Updated path
    });
    console.log('Migrations completed!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();