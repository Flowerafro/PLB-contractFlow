// Main database schema - Single source of truth
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
//import { sql } from "drizzle-orm";

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  customerCode: text("customer_code"),
  email: text("email"),
  phone: text("phone"),
  country: text("country"),
  status: text("status").notNull().default("ACTIVE"),
  //createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

// til klienthåndtering i repo/service (features/clients) 
export type DBClient = typeof clients.$inferSelect;
export type DBClientInsert = typeof clients.$inferInsert;


export const principals = sqliteTable("principals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  //createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  plbReference: text("plb_reference").notNull().unique(),
  clientId: integer("client_id").notNull()
    .references(() => clients.id, { onDelete: "restrict", onUpdate: "cascade" }),
  principalId: integer("principal_id")
    .references(() => principals.id, { onDelete: "set null", onUpdate: "cascade" }),
  productCode: text("product_code"),
  orderDate: text("order_date"), // ISO 8601 format: YYYY-MM-DD
  tonnPerFcl: real("tonn_per_fcl"),
  priceUsdPerMtC: integer("price_usd_per_mt_c").notNull().default(0), // Price in USD cents
  totalUsdC: integer("total_usd_c").notNull().default(0), // Total in USD cents
  commissionGroupBp: integer("commission_group_bp"), // Basis points (1/100 of a percent)
  customerOrderNo: text("customer_order_no"),
  principalContractNo: text("principal_contract_no"),
  principalContractDate: text("principal_contract_date"), // ISO 8601 format
  principalOrderNo: text("principal_order_no"),
  status: text("status").notNull().default("ACTIVE"), // ACTIVE, COMPLETED, CANCELLED
  //createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const shipments = sqliteTable("shipments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contractId: integer("contract_id").notNull()
    .references(() => contracts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  containerNumber: text("container_number").unique(), // Containers should be unique
  bookingNo: text("booking_no"),
  blNumber: text("bl_number"),
  aakDelNo: text("aak_del_no"),
  poEta: text("po_eta"), // ISO 8601 format: YYYY-MM-DD
  etd: text("etd"), // Estimated Time of Departure
  blDate: text("bl_date"), // Bill of Lading date
  eta: text("eta"), // Estimated Time of Arrival
  tonnesDelivered: real("tonnes_delivered"),
  status: text("status").notNull().default("PENDING"), // PENDING, IN_TRANSIT, DELIVERED, CANCELLED
  //createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const invoices = sqliteTable("invoices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contractId: integer("contract_id").notNull()
    .references(() => contracts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  principalInvoiceNo: text("principal_invoice_no").unique(),
  principalInvoiceDate: text("principal_invoice_date"), // ISO 8601 format
  invoiceDueDate: text("invoice_due_date"), // ISO 8601 format
  invoicedAmountC: integer("invoiced_amount_c").notNull().default(0), // Amount in USD cents
  status: text("status").notNull().default("PENDING"), // PENDING, SENT, PAID, OVERDUE, CANCELLED
  //createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("table_name").notNull(),
  recordId: integer("record_id").notNull(),
  operation: text("operation").notNull(), // 'INSERT' | 'UPDATE' | 'DELETE'
  userId: integer("user_id"),
  //timestamp: text("timestamp").notNull().default(sql`datetime('now')`),
  oldData: text("old_data"), // JSON string
  newData: text("new_data")  // JSON string
});

// Performance indexes will be added via SQL migrations to avoid LibSQL compatibility issues
// This ensures consistent behavior between local SQLite and Cloudflare D1