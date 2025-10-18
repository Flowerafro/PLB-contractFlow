// drizzle schema (SQLite)
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const clients = sqliteTable(
    "clients", 
{
  id: integer("id")
  .primaryKey(
    { autoIncrement: true }
    ),
  name: text("name").notNull().unique(),
  customerCode: text("customer_code"),
  email: text("email"),
  phone: text("phone"),
  country: text("country"),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const principals = sqliteTable("principals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique().default("AAK"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  plbReference: text("plb_reference").notNull().unique(),
  clientId: integer("client_id").notNull()
    .references(() => clients.id, { onDelete: "restrict", onUpdate: "cascade" }),
  principalId: integer("principal_id")
    .references(() => principals.id, { onDelete: "set null", onUpdate: "cascade" }),
  productCode: text("product_code"),
  orderDate: text("order_date"), // ISO
  tonnPerFcl: real("tonn_per_fcl"),
  priceUsdPerMtC: integer("price_usd_per_mt_c").notNull().default(0),
  totalUsdC: integer("total_usd_c").notNull().default(0),
  commissionGroupBp: integer("commission_group_bp"),
  customerOrderNo: text("customer_order_no"),
  principalContractNo: text("principal_contract_no"),
  principalContractDate: text("principal_contract_date"),
  principalOrderNo: text("principal_order_no"),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

export const shipments = sqliteTable("shipments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contractId: integer("contract_id").notNull()
    .references(() => contracts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  containerNumber: text("container_number"),
  bookingNo: text("booking_no"),
  blNumber: text("bl_number"),
  aakDelNo: text("aak_del_no"),
  poEta: text("po_eta"),
  etd: text("etd"),
  blDate: text("bl_date"),
  eta: text("eta"),
  tonnesDelivered: real("tonnes_delivered"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

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