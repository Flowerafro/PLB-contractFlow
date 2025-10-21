import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  customerCode: text("customer_code"),
  email: text("email"),
  phone: text("phone"),
  country: text("country"),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});
