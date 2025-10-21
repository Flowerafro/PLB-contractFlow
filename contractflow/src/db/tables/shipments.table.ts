import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { contracts } from "./contracts.table";

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
