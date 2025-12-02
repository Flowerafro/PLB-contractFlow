-- PLB ContractFlow D1 Database Setup
-- Execute with: npx wrangler d1 execute plb-contractflow-db --file=./setup-d1.sql

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Create principals table
CREATE TABLE IF NOT EXISTS principals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL
);

-- Create clients table  
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  customer_code TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  status TEXT DEFAULT 'ACTIVE' NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plb_reference TEXT NOT NULL UNIQUE,
  client_id INTEGER NOT NULL,
  principal_id INTEGER,
  product_code TEXT,
  order_date TEXT,
  tonn_per_fcl REAL,
  price_usd_per_mt_c INTEGER DEFAULT 0 NOT NULL,
  total_usd_c INTEGER DEFAULT 0 NOT NULL,
  commission_group_bp INTEGER,
  customer_order_no TEXT,
  principal_contract_no TEXT,
  principal_contract_date TEXT,
  principal_order_no TEXT,
  status TEXT DEFAULT 'ACTIVE' NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (principal_id) REFERENCES principals(id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_id INTEGER NOT NULL,
  container_number TEXT UNIQUE,
  booking_no TEXT,
  bl_number TEXT,
  aak_del_no TEXT,
  po_eta TEXT,
  etd TEXT,
  bl_date TEXT,
  eta TEXT,
  tonnes_delivered REAL,
  status TEXT DEFAULT 'PENDING' NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_id INTEGER NOT NULL,
  principal_invoice_no TEXT UNIQUE,
  principal_invoice_date TEXT,
  invoice_due_date TEXT,
  invoiced_amount_c INTEGER DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'PENDING' NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_id INTEGER NOT NULL,
  operation TEXT NOT NULL,
  user_id INTEGER,
  timestamp TEXT DEFAULT (datetime('now')) NOT NULL,
  old_data TEXT,
  new_data TEXT
);

-- Create search view for cross-table queries
CREATE VIEW IF NOT EXISTS v_search AS
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_customer_code ON clients(customer_code);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_principal_id ON contracts(principal_id); 
CREATE INDEX IF NOT EXISTS idx_contracts_plb_reference ON contracts(plb_reference);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_shipments_contract_id ON shipments(contract_id);
CREATE INDEX IF NOT EXISTS idx_shipments_container_number ON shipments(container_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_invoices_contract_id ON invoices(contract_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp);

-- Insert default principal (AAK)
INSERT OR IGNORE INTO principals (name) VALUES ('AAK');