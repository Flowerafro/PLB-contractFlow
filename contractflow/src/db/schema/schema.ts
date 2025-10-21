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

export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("table_name").notNull(),
  recordId: integer("record_id").notNull(),
  action: text("action").notNull(),
  userId: integer("user_id"),
  changes: text("changes"),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`)
});

// Add indexes for frequently queried fields
export const contractsClientIdIdx = sql`CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON contracts (client_id)`;
export const contractsPrincipalIdIdx = sql`CREATE INDEX IF NOT EXISTS idx_contracts_principal_id ON contracts (principal_id)`;
export const contractsOrderDateIdx = sql`CREATE INDEX IF NOT EXISTS idx_contracts_order_date ON contracts (order_date)`;
export const shipmentsContainerNumberIdx = sql`CREATE INDEX IF NOT EXISTS idx_shipments_container_number ON shipments (container_number)`;
export const shipmentsEtaIdx = sql`CREATE INDEX IF NOT EXISTS idx_shipments_eta ON shipments (eta)`;

// Global search view
export const searchView = sql`
CREATE VIEW IF NOT EXISTS v_search AS
SELECT 
    c.id as contract_id,
    c.plb_reference,
    cl.name as client_name,
    p.name as principal_name,
    s.container_number,
    i.principal_invoice_no
FROM contracts c
LEFT JOIN clients cl ON c.client_id = cl.id
LEFT JOIN principals p ON c.principal_id = p.id
LEFT JOIN shipments s ON s.contract_id = c.id
LEFT JOIN invoices i ON i.contract_id = c.id
`;