import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("table_name").notNull(),
  rowId: integer("row_id").notNull(),
  operation: text("operation").notNull(), // 'INSERT' | 'UPDATE' | 'DELETE'
  userId: integer("user_id"),             // valgfritt, hvis dere kobler til users
  timestamp: text("timestamp").notNull().default(sql`datetime('now')`),
  oldData: text("old_data"),              // JSON
  newData: text("new_data")               // JSON
});
