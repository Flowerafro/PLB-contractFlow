import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema/schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite', // LibSQL is SQLite-compatible
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./local.db'
  },
  verbose: true,
  strict: true,
} satisfies Config;