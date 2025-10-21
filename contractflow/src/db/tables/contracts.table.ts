import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { clients } from "./clients.table";
import { principals } from "./principals.table";

export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  plbReference: text("plb_reference").notNull().unique(),
  clientId: integer("client_id").notNull()
    .references(() => clients.id, { onDelete: "restrict", onUpdate: "cascade" }),
  principalId: integer("principal_id")
    .references(() => principals.id, { onDelete: "set null", onUpdate: "cascade" }),
  productCode: text("product_code"),
  orderDate: text("order_date"),               // ISO
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
