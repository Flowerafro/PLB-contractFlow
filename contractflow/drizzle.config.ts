import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/tables/*',
  out: './src/db/migrations',
  dialect: 'sqlite',  // Keep as sqlite since we're using local SQLite file
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./local.db'
  },
  verbose: true,
  strict: true,
} satisfies Config;