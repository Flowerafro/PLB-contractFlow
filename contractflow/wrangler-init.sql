-- Initialize tables for Wrangler local development

CREATE TABLE IF NOT EXISTS principals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  customer_code TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plb_reference TEXT NOT NULL UNIQUE,
  client_id INTEGER NOT NULL,
  principal_id INTEGER,
  product_code TEXT,
  order_date TEXT,
  tonn_per_fcl REAL,
  price_usd_per_mt_c INTEGER NOT NULL DEFAULT 0,
  total_usd_c INTEGER NOT NULL DEFAULT 0,
  commission_group_bp INTEGER,
  customer_order_no TEXT,
  principal_contract_no TEXT,
  principal_contract_date TEXT,
  principal_order_no TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (principal_id) REFERENCES principals(id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_id INTEGER NOT NULL,
  container_number TEXT,
  booking_no TEXT,
  bl_number TEXT,
  aak_del_no TEXT,
  po_eta TEXT,
  etd TEXT,
  bl_date TEXT,
  eta TEXT,
  tonnes_delivered REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_id INTEGER NOT NULL,
  principal_invoice_no TEXT UNIQUE,
  principal_invoice_date TEXT,
  invoice_due_date TEXT,
  invoiced_amount_c INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  user_id INTEGER,
  changes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Insert sample data
INSERT OR IGNORE INTO principals (name) VALUES 
  ('AAK'), 
  ('Test Principal'), 
  ('Global Commodities Ltd'), 
  ('Nordic Trading AS');

INSERT OR IGNORE INTO clients (name, customer_code, email, phone, country) VALUES 
  ('Acme Corporation', 'ACM001', 'contact@acme.com', '+1-555-0123', 'USA'),
  ('Nordic Foods AS', 'NF001', 'orders@nordicfoods.no', '+47 22 33 44 55', 'Norway'),
  ('Global Imports Ltd', 'GI001', 'trading@globalimports.co.uk', '+44 20 7123 4567', 'United Kingdom'),
  ('Euro Grain GmbH', 'EG001', 'procurement@eurograin.de', '+49 40 123 456', 'Germany');

-- Insert contracts using subqueries to get correct IDs
INSERT OR IGNORE INTO contracts (plb_reference, client_id, principal_id, product_code, order_date, tonn_per_fcl, price_usd_per_mt_c, total_usd_c, commission_group_bp, customer_order_no) VALUES 
  ('PLB-2024-001', (SELECT id FROM clients WHERE name = 'Acme Corporation'), (SELECT id FROM principals WHERE name = 'AAK'), 'WHEAT-HRW', '2024-01-15', 25.0, 32500, 812500, 150, 'ACM-2024-001'),
  ('PLB-2024-002', (SELECT id FROM clients WHERE name = 'Nordic Foods AS'), (SELECT id FROM principals WHERE name = 'AAK'), 'BARLEY-FEED', '2024-02-10', 27.0, 28000, 756000, 125, 'NF-2024-001'),
  ('PLB-2024-003', (SELECT id FROM clients WHERE name = 'Global Imports Ltd'), (SELECT id FROM principals WHERE name = 'Test Principal'), 'CORN-YELLOW', '2024-03-05', 26.5, 30000, 795000, 140, 'GI-2024-001'),
  ('PLB-2024-004', (SELECT id FROM clients WHERE name = 'Euro Grain GmbH'), (SELECT id FROM principals WHERE name = 'Global Commodities Ltd'), 'WHEAT-SOFT', '2024-04-12', 25.5, 31000, 790500, 130, 'EG-2024-001');

INSERT OR IGNORE INTO shipments (contract_id, container_number, booking_no, bl_number, etd, eta, tonnes_delivered) VALUES 
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-001'), 'MSCU1234567', 'MSC2024001', 'MSC240101', '2024-02-01', '2024-02-20', 25.0),
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-002'), 'MAEU7654321', 'MAE2024002', 'MAE240102', '2024-03-01', '2024-03-18', 27.0),
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-003'), 'COSCO998877', 'COS2024003', 'COS240103', '2024-04-01', '2024-04-22', 26.5);

INSERT OR IGNORE INTO invoices (contract_id, principal_invoice_no, principal_invoice_date, invoiced_amount_c) VALUES 
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-001'), 'AAK-2024-001', '2024-02-25', 812500),
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-002'), 'AAK-2024-002', '2024-03-20', 756000),
  ((SELECT id FROM contracts WHERE plb_reference = 'PLB-2024-003'), 'TP-2024-001', '2024-04-25', 795000);