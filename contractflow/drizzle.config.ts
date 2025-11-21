import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/schema/schema.ts',
  dialect: 'sqlite', 
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
    url: process.env.DATABASE_URL ?? 'file:./local.db'
  },
  verbose: true,
  strict: true,
});

/*
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite', 
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./local.db'
  },
  verbose: true,
  strict: true,
} satisfies Config;
*/