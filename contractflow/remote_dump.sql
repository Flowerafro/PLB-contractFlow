PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" VALUES(1,'0000_charming_doorman.sql','2025-11-19 10:11:16');
CREATE TABLE `audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`table_name` text NOT NULL,
	`record_id` integer NOT NULL,
	`operation` text NOT NULL,
	`user_id` integer,
	`old_data` text,
	`new_data` text
);
INSERT INTO "audit_log" VALUES(1,'contracts',1,'INSERT',1,NULL,'{"plb_reference":"PLB-2024-001","client_id":1,"status":"ACTIVE"}');
INSERT INTO "audit_log" VALUES(2,'contracts',2,'INSERT',1,NULL,'{"plb_reference":"PLB-2024-002","client_id":2,"status":"ACTIVE"}');
INSERT INTO "audit_log" VALUES(3,'shipments',1,'UPDATE',1,'{"status":"IN_TRANSIT"}','{"status":"DELIVERED","tonnes_delivered":25.2}');
INSERT INTO "audit_log" VALUES(4,'invoices',1,'UPDATE',1,'{"status":"SENT"}','{"status":"PAID"}');
CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`customer_code` text,
	`email` text,
	`phone` text,
	`country` text,
	`status` text DEFAULT 'ACTIVE' NOT NULL
);
INSERT INTO "clients" VALUES(1,'Roberts Manufacturing Co. Ltd.','RMCL','roberts@roberts.com','+1 THIS IS A NUMBER','Barbados','ACTIVE');
INSERT INTO "clients" VALUES(2,'Maverick Foods / Munné','MFM','maverick@maverick.com','+1 THIS IS A NUMBER','Dominican Republic','ACTIVE');
INSERT INTO "clients" VALUES(3,'Sterling Products Ltd','SPL','sterling@sterling.com','+1 THIS IS A NUMBER','Guyana','ACTIVE');
INSERT INTO "clients" VALUES(4,'Associated Brands - Chocolate Division','ABCD','chocolate@brands.com','+1 THIS IS A NUMBER','Trinidad and Tobago','ACTIVE');
INSERT INTO "clients" VALUES(5,'CH Alimentos','CHA	','ch@alimentos.com','+1 THIS IS A NUMBER','Dominican Republic','ACTIVE');
INSERT INTO "clients" VALUES(6,'Associated Brands - Consolidated Biscuits Division','ABCBD','biscuits@brands.com','+1 THIS IS A NUMBER','Dominican Republic','ACTIVE');
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
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`principal_id`) REFERENCES `principals`(`id`) ON UPDATE cascade ON DELETE set null
);
INSERT INTO "contracts" VALUES(1,'1/2025',1,1,'Kristal Special','08.01.2025',4.4,362000,1592800,150,'39703','31328073','09.01.2025',replace(replace('1521580\r\n','\r',char(13)),'\n',char(10)),'ACTIVE');
INSERT INTO "contracts" VALUES(2,'2/2025',2,1,'Akopol NH30','23.01.2025',21.95,276500,6069175,125,'1000709','31329356','23.01.2025','1541676','ACTIVE');
INSERT INTO "contracts" VALUES(3,'3/2025',3,1,'Akoblend R','28.01.2025',21.95,285500,6266725,175,'3038897','31329919','29.01.2025','154122','COMPLETED');
INSERT INTO "contracts" VALUES(4,'4/2025	',4,1,'Cisao 37-14','03.02.2025',21.95,288500,6332575,NULL,'P00345','31330162','03.02.2025','1547180','ACTIVE');
INSERT INTO "contracts" VALUES(5,'6/2025	',5,1,'Akopol NH30','07.02.2025',21.95,297000,6519150,NULL,'OC-007021','31330907','10.02.2025','1548581','ACTIVE');
INSERT INTO "contracts" VALUES(7,'PLB-2025-006',1,1,'Akobake S100','2025-07-03',21.95,24350000,534482500,0,'40882','31330912','','1547575','ACTIVE');
INSERT INTO "contracts" VALUES(8,'PLB-2025-001',1,4,'Akobake S100',NULL,21.95,24350000,534482500,NULL,NULL,'40882',NULL,'31330912','ACTIVE');
INSERT INTO "contracts" VALUES(9,'PLB-2025-002',2,5,'Akopol NH30',NULL,21.95,297000,6519150,NULL,'OC-007021','31330907',NULL,'1548581','ACTIVE');
INSERT INTO "contracts" VALUES(10,'PLB-2025-003',3,6,'Cisao 37-14',NULL,21.95,288500,6332575,NULL,'P00345','31330162',NULL,'1547180','ACTIVE');
INSERT INTO "contracts" VALUES(11,'PLB-2025-004',4,7,'Akopol NH30',NULL,21.95,276500,6069175,125,'1000709','31329356',NULL,'1541676','ACTIVE');
INSERT INTO "contracts" VALUES(12,'PLB-2025-005',1,8,'Kristal Special',NULL,4.4,362000,1592800,150,'39703','31328073',NULL,'1521580','ACTIVE');
INSERT INTO "contracts" VALUES(13,'PLB-2025-007',2,5,'Akopol NH30',NULL,21.95,297000,6519150,NULL,'OC-007022','31330908',NULL,'1548582','ACTIVE');
INSERT INTO "contracts" VALUES(14,'PLB-2025-008',3,6,'Cisao 37-14',NULL,21.95,288500,6332575,NULL,'P00346','31330163',NULL,'1547181','ACTIVE');
INSERT INTO "contracts" VALUES(15,'PLB-2025-009',4,7,'Akopol NH30',NULL,21.95,276500,6069175,125,'1000710','31329357',NULL,'1541677','ACTIVE');
INSERT INTO "contracts" VALUES(16,'PLB-2025-010',1,8,'Kristal Special',NULL,4.4,362000,1592800,150,'39704','31328074',NULL,'1521581','ACTIVE');
INSERT INTO "contracts" VALUES(17,'PLB-2025-011',2,5,'Akopol NH30',NULL,21.95,297000,6519150,NULL,'OC-007023','31330909',NULL,'1548583','ACTIVE');
INSERT INTO "contracts" VALUES(18,'PLB-2025-012',3,6,'Cisao 37-14',NULL,21.95,288500,6332575,NULL,'P00347','31330164',NULL,'1547182','ACTIVE');
INSERT INTO "contracts" VALUES(19,'PLB-2025-013',4,7,'Akopol NH30',NULL,21.95,276500,6069175,125,'1000711','31329358',NULL,'1541678','ACTIVE');
INSERT INTO "contracts" VALUES(20,'PLB-2025-014',1,8,'Kristal Special',NULL,4.4,362000,1592800,150,'39705','31328075',NULL,'1521582','ACTIVE');
INSERT INTO "contracts" VALUES(21,'PLB-2025-015',2,5,'Akopol NH30',NULL,21.95,297000,6519150,NULL,'OC-007024','31330910',NULL,'1548584','ACTIVE');
CREATE TABLE `invoices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contract_id` integer NOT NULL,
	`principal_invoice_no` text,
	`principal_invoice_date` text,
	`invoice_due_date` text,
	`invoiced_amount_c` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE cascade ON DELETE cascade
);
INSERT INTO "invoices" VALUES(1,1,replace(replace('5290455199\r\n','\r',char(13)),'\n',char(10)),replace(replace('14.03.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('13.05.2025\r\n','\r',char(13)),'\n',char(10)),1542310,'PAID');
INSERT INTO "invoices" VALUES(2,2,replace(replace('5290451502\r\n','\r',char(13)),'\n',char(10)),replace(replace('05.02.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('Prepaid\r\n','\r',char(13)),'\n',char(10)),6069175,'PAID');
INSERT INTO "invoices" VALUES(3,3,replace(replace('5290455197\r\n','\r',char(13)),'\n',char(10)),replace('14.03.2025\n','\n',char(10)),'13.05.2025',6266725,'SENT');
INSERT INTO "invoices" VALUES(4,4,'5290457484',replace('07.04.2025\n','\n',char(10)),'06.06.2025',6332575,'SENT');
INSERT INTO "invoices" VALUES(5,5,'5290459857','05.05.2025','04.07.2025',651950,'SENT');
INSERT INTO "invoices" VALUES(8,8,'1547575',NULL,NULL,0,'PENDING');
INSERT INTO "invoices" VALUES(9,9,'5290459858','2025-05-05','2025-04-07',651950,'PENDING');
INSERT INTO "invoices" VALUES(10,10,'5290457485','2025-07-04','2025-06-06',6332575,'PENDING');
INSERT INTO "invoices" VALUES(11,11,'5290451502','2025-05-02',NULL,6069175,'PENDING');
INSERT INTO "invoices" VALUES(12,12,'5290455199',NULL,NULL,1542310,'PENDING');
INSERT INTO "invoices" VALUES(13,13,'5290459859','2025-05-06','2025-04-08',651950,'PENDING');
INSERT INTO "invoices" VALUES(14,14,'5290457486','2025-07-05','2025-06-07',6332575,'PENDING');
INSERT INTO "invoices" VALUES(15,15,'5290451503','2025-05-03',NULL,6069175,'PENDING');
INSERT INTO "invoices" VALUES(16,16,'5290455200',NULL,NULL,1542311,'PENDING');
INSERT INTO "invoices" VALUES(17,17,'5290459860','2025-05-07','2025-04-09',651950,'PENDING');
INSERT INTO "invoices" VALUES(18,18,'5290457487','2025-07-06','2025-06-08',6332575,'PENDING');
INSERT INTO "invoices" VALUES(19,19,'5290451504','2025-05-04',NULL,6069175,'PENDING');
INSERT INTO "invoices" VALUES(20,20,'5290455201',NULL,NULL,1542312,'PENDING');
INSERT INTO "invoices" VALUES(21,21,'5290459861','2025-05-08','2025-04-10',651950,'PENDING');
CREATE TABLE `principals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
INSERT INTO "principals" VALUES(1,'AAK');
INSERT INTO "principals" VALUES(4,'Principal B');
INSERT INTO "principals" VALUES(5,'Principal C');
INSERT INTO "principals" VALUES(6,'Principal D');
INSERT INTO "principals" VALUES(7,'Principal E');
INSERT INTO "principals" VALUES(8,'Principal F');
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
	`status` text DEFAULT 'PENDING' NOT NULL,
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE cascade ON DELETE cascade
);
INSERT INTO "shipments" VALUES(1,1,'MSDU 2844042',replace(replace('229ISE0067724\r\n','\r',char(13)),'\n',char(10)),replace(replace('GOT0138736\r\n','\r',char(13)),'\n',char(10)),replace(replace('81566477\r\n','\r',char(13)),'\n',char(10)),replace(replace('23.04.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('14.03.2025\r\n','\r',char(13)),'\n',char(10)),replace('19.03.2025\n19.03.2025\n','\n',char(10)),replace('05.05.2025\n05.05.2025\n','\n',char(10)),4.255,'DELIVERED');
INSERT INTO "shipments" VALUES(2,2,replace(replace('HLBU 3571477\r\n','\r',char(13)),'\n',char(10)),NULL,NULL,replace(replace('81572547\r\n','\r',char(13)),'\n',char(10)),replace(replace('31.03.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('13.02.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('FCA\r\n','\r',char(13)),'\n',char(10)),replace(replace('FCA\r\n','\r',char(13)),'\n',char(10)),21.95,'DELIVERED');
INSERT INTO "shipments" VALUES(3,3,replace('MSMU 2749057\n','\n',char(10)),replace(replace('229|SE0068780\r\n','\r',char(13)),'\n',char(10)),replace(replace('GOT0139187\r\n','\r',char(13)),'\n',char(10)),replace(replace('81581092\r\n','\r',char(13)),'\n',char(10)),replace(replace('11.04.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('13.03.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('19.03.2025\r\n','\r',char(13)),'\n',char(10)),replace('03.05.2025\n03.05.2025\n','\n',char(10)),21.95,'DELIVERED');
INSERT INTO "shipments" VALUES(4,4,replace('UETU 2684429\n','\n',char(10)),replace('229|SE0073400\n','\n',char(10)),replace(replace('GOT0140827\r\n','\r',char(13)),'\n',char(10)),replace(replace('81575322\r\n','\r',char(13)),'\n',char(10)),replace(replace('June\r\n','\r',char(13)),'\n',char(10)),replace(replace('07.04.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('11.04.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('04.06.2025\r\n','\r',char(13)),'\n',char(10)),21.95,'DELIVERED');
INSERT INTO "shipments" VALUES(5,5,replace(replace('GCXU 2370985\r\n','\r',char(13)),'\n',char(10)),replace(replace('23763715\r\n','\r',char(13)),'\n',char(10)),replace(replace('GOT0141433\r\n','\r',char(13)),'\n',char(10)),replace(replace('81576796\r\n','\r',char(13)),'\n',char(10)),replace(replace('June\r\n','\r',char(13)),'\n',char(10)),replace(replace('05.05.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('12.05.2025\r\n','\r',char(13)),'\n',char(10)),replace(replace('15.06.2025\r\n','\r',char(13)),'\n',char(10)),21.95,'DELIVERED');
INSERT INTO "shipments" VALUES(8,8,NULL,NULL,NULL,'1547575',NULL,NULL,NULL,NULL,NULL,'PENDING');
INSERT INTO "shipments" VALUES(9,9,'GCXU 2370985','23763715','GOT0141433','81576796','2025-05-05',NULL,'2025-12-05',NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(10,10,'UETU 2684429','229|SE0073400','GOT0140827','81575322','2025-07-04','2025-06-06','2025-11-04','2025-04-06',21.95,'PENDING');
INSERT INTO "shipments" VALUES(11,11,'HLBU 3571477',NULL,NULL,'81572547',NULL,NULL,NULL,NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(12,12,'MSDU 2844043','229ISE0067724','GOT0138736','81566477',NULL,NULL,NULL,NULL,4.255,'PENDING');
INSERT INTO "shipments" VALUES(13,13,'GCXU 2370986','23763716','GOT0141434','81576797','2025-05-06',NULL,'2025-12-06',NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(14,14,'UETU 2684430','229|SE0073401','GOT0140828','81575323','2025-07-05','2025-06-07','2025-11-05','2025-04-07',21.95,'PENDING');
INSERT INTO "shipments" VALUES(15,15,'HLBU 3571478',NULL,NULL,'81572548',NULL,NULL,NULL,NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(16,16,'MSDU 2844044','229ISE0067725','GOT0138737','81566478',NULL,NULL,NULL,NULL,4.255,'PENDING');
INSERT INTO "shipments" VALUES(17,17,'GCXU 2370987','23763717','GOT0141435','81576798','2025-05-07',NULL,'2025-12-07',NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(18,18,'UETU 2684431','229|SE0073402','GOT0140829','81575324','2025-07-06','2025-06-08','2025-11-06','2025-04-08',21.95,'PENDING');
INSERT INTO "shipments" VALUES(19,19,'HLBU 3571479',NULL,NULL,'81572549',NULL,NULL,NULL,NULL,21.95,'PENDING');
INSERT INTO "shipments" VALUES(20,20,'MSDU 2844045','229ISE0067726','GOT0138738','81566479',NULL,NULL,NULL,NULL,4.255,'PENDING');
INSERT INTO "shipments" VALUES(21,21,'GCXU 2370988','23763718','GOT0141436','81576799','2025-05-08',NULL,'2025-12-08',NULL,21.95,'PENDING');
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('d1_migrations',1);
INSERT INTO "sqlite_sequence" VALUES('clients',16);
INSERT INTO "sqlite_sequence" VALUES('principals',8);
INSERT INTO "sqlite_sequence" VALUES('contracts',21);
INSERT INTO "sqlite_sequence" VALUES('shipments',21);
INSERT INTO "sqlite_sequence" VALUES('invoices',21);
INSERT INTO "sqlite_sequence" VALUES('audit_log',4);
CREATE UNIQUE INDEX `clients_name_unique` ON `clients` (`name`);
CREATE UNIQUE INDEX `contracts_plb_reference_unique` ON `contracts` (`plb_reference`);
CREATE UNIQUE INDEX `invoices_principal_invoice_no_unique` ON `invoices` (`principal_invoice_no`);
CREATE UNIQUE INDEX `principals_name_unique` ON `principals` (`name`);
CREATE UNIQUE INDEX `shipments_container_number_unique` ON `shipments` (`container_number`);
CREATE VIEW v_search AS
SELECT
    c.id as contract_id,
    c.plb_reference,
    c.product_code,
    c.customer_order_no,
    cl.id as client_id,
    cl.name as client_name,
    cl.customer_code,
    p.id as principal_id,
    p.name as principal_name,
    s.id as shipment_id,
    s.container_number,
    s.booking_no,
    s.bl_number,
    i.id as invoice_id,
    i.principal_invoice_no,
    c.created_at as contract_created,
    s.eta as shipment_eta
FROM contracts c
LEFT JOIN clients cl ON c.client_id = cl.id
LEFT JOIN principals p ON c.principal_id = p.id
LEFT JOIN shipments s ON s.contract_id = c.id
LEFT JOIN invoices i ON i.contract_id = c.id;
