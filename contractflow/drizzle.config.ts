import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./local.db'
  },
  verbose: true,
  strict: true,
});