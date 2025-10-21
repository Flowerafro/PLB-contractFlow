PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = FULL;

CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`customer_code` text,
	`email` text,
	`phone` text,
	`country` text,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`created_at` text DEFAULT datetime('now') NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clients_name_unique` ON `clients` (`name`);--> statement-breakpoint
CREATE TABLE `contracts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`plb_reference` text NOT NULL,
	`client_id` integer NOT NULL,
	`principal_id` integer,
	`product_code` text,
	`order_date` text,
	`tonn_per_fcl` real,
	`price_usd_per_mt_c` integer DEFAULT 0 NOT NULL,
	`total_usd_c` integer DEFAULT 0 NOT NULL,
	`commission_group_bp` integer,
	`customer_order_no` text,
	`principal_contract_no` text,
	`principal_contract_date` text,
	`principal_order_no` text,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`created_at` text DEFAULT datetime('now') NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`principal_id`) REFERENCES `principals`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contracts_plb_reference_unique` ON `contracts` (`plb_reference`);--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contract_id` integer NOT NULL,
	`principal_invoice_no` text,
	`principal_invoice_date` text,
	`invoice_due_date` text,
	`invoiced_amount_c` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT datetime('now') NOT NULL,
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invoices_principal_invoice_no_unique` ON `invoices` (`principal_invoice_no`);--> statement-breakpoint
CREATE TABLE `principals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT datetime('now') NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `principals_name_unique` ON `principals` (`name`);--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contract_id` integer NOT NULL,
	`container_number` text,
	`booking_no` text,
	`bl_number` text,
	`aak_del_no` text,
	`po_eta` text,
	`etd` text,
	`bl_date` text,
	`eta` text,
	`tonnes_delivered` real,
	`created_at` text DEFAULT datetime('now') NOT NULL,
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE cascade ON DELETE cascade
);
