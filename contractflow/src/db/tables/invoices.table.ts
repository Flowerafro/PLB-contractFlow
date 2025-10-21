import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { contracts } from "./contracts.table";

export const invoices = sqliteTable("invoices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contractId: integer("contract_id").notNull()
    .references(() => contracts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  principalInvoiceNo: text("principal_invoice_no").unique(),
  principalInvoiceDate: text("principal_invoice_date"),
  invoiceDueDate: text("invoice_due_date"),
  invoicedAmountC: integer("invoiced_amount_c").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});
