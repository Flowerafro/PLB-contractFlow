/**
 * Local D1 Database Seeder
 * Seeds the local D1 database
 */

import { execSync } from 'child_process';

async function seedDatabase() {
  console.log('🌱 Seeding local D1 database...');
  
  try {
    
    console.log('📊 Checking current data...');
    const checkResult = execSync('pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "SELECT COUNT(*) as count FROM clients;"', { encoding: 'utf8' });
    
    
    const hasData = checkResult.match(/│\s*(\d+)\s*│/) && !checkResult.includes('│ 0     │');
    
    if (!hasData) {
      console.log('📝 No data found, adding sample data...');
      
      
      console.log('🔄 Resetting ID sequences...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "UPDATE sqlite_sequence SET seq = 0 WHERE name IN ('principals', 'clients', 'contracts', 'shipments', 'invoices', 'audit_log');"`, { stdio: 'inherit' });
      
      
      console.log('🏢 Adding principals...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO principals (name) VALUES ('AAK'), ('Cargill Inc.'), ('ADM Trading'), ('Bunge Global'), ('Viterra Ltd'), ('Glencore Agriculture'), ('Louis Dreyfus Company'), ('COFCO International'), ('Archer Daniels Midland'), ('Olam Group');"`, { stdio: 'inherit' });
      
      
      console.log('👥 Adding clients...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO clients (name, customer_code, email, phone, country, status) VALUES ('Roberts Manufacturing Co. Ltd.', 'RMC001', 'orders@roberts-mfg.com', '+44 20 7123 4567', 'United Kingdom', 'ACTIVE'), ('Global Foods International', 'GFI002', 'procurement@globalfoods.com', '+1 212 555 0123', 'United States', 'ACTIVE'), ('Nordic Grain AS', 'NGN003', 'trading@nordicgrain.no', '+47 22 33 44 55', 'Norway', 'ACTIVE'), ('European Commodities GmbH', 'ECG004', 'contact@eurocommodities.de', '+49 40 123 456', 'Germany', 'ACTIVE'), ('Asia Pacific Trading', 'APT005', 'sales@aptrading.sg', '+65 6123 4567', 'Singapore', 'ACTIVE'), ('Mediterranean Foods SA', 'MFS006', 'info@medfoods.gr', '+30 210 123 4567', 'Greece', 'ACTIVE'), ('Baltic Grain Corp', 'BGC007', 'trading@balticgrain.ee', '+372 6123 456', 'Estonia', 'ACTIVE'), ('Scandinavian Feed Mills', 'SFM008', 'orders@scanfeed.se', '+46 8 123 4567', 'Sweden', 'ACTIVE'), ('Atlantic Commodities', 'ACL009', 'sales@atlantic-comm.ie', '+353 1 234 5678', 'Ireland', 'ACTIVE'), ('Continental Trading House', 'CTH010', 'info@continental-trade.nl', '+31 20 123 4567', 'Netherlands', 'ACTIVE'), ('Northern Agri Solutions', 'NAS011', 'contact@northernagri.fi', '+358 9 123 4567', 'Finland', 'ACTIVE'), ('Iberian Grain Exchange', 'IGE012', 'trading@iberiangrain.es', '+34 91 123 4567', 'Spain', 'ACTIVE');"`, { stdio: 'inherit' });
      
      
      console.log('📄 Adding contracts...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO contracts (plb_reference, client_id, principal_id, product_code, order_date, tonn_per_fcl, price_usd_per_mt_c, total_usd_c, commission_group_bp, customer_order_no, principal_contract_no, principal_contract_date, principal_order_no, status) VALUES ('1/2025', 1, 1, 'KRISTAL-SPEC', '2025-01-08', 4.4, 362000, 1592800, 250, '39703', '31328073', '2025-01-09', '1521580', 'ACTIVE'), ('2/2025', 2, 2, 'WHEAT-HRW', '2025-01-15', 25.0, 32500, 812500, 200, 'GFI-2025-001', '31328074', '2025-01-16', '1521581', 'ACTIVE'), ('3/2025', 3, 1, 'BARLEY-FEED', '2025-02-10', 27.0, 28000, 756000, 180, 'NGN-2025-001', '31328075', '2025-02-11', '1521582', 'ACTIVE'), ('4/2025', 4, 3, 'CORN-YELLOW', '2025-03-05', 26.5, 30000, 795000, 220, 'ECG-2025-001', '31328076', '2025-03-06', '1521583', 'ACTIVE'), ('5/2025', 5, 2, 'SOYBEANS', '2025-03-20', 24.8, 58000, 1438400, 190, 'APT-2025-001', '31328077', '2025-03-21', '1521584', 'ACTIVE'), ('6/2025', 6, 1, 'WHEAT-SOFT', '2025-04-12', 25.5, 31000, 790500, 210, 'MFS-2025-001', '31328078', '2025-04-13', '1521585', 'ACTIVE'), ('7/2025', 7, 4, 'SUNFLOWER-OIL', '2025-04-18', 22.0, 125000, 2750000, 300, 'BGC-2025-001', '31328079', '2025-04-19', '1521586', 'ACTIVE'), ('8/2025', 8, 5, 'RAPESEED', '2025-05-02', 24.5, 45000, 1102500, 250, 'SFM-2025-001', '31328080', '2025-05-03', '1521587', 'ACTIVE'), ('9/2025', 9, 6, 'WHEAT-DURUM', '2025-05-14', 26.8, 34000, 911200, 220, 'ACL-2025-001', '31328081', '2025-05-15', '1521588', 'ACTIVE'), ('10/2025', 10, 7, 'CORN-WHITE', '2025-06-01', 25.2, 29000, 730800, 200, 'CTH-2025-001', '31328082', '2025-06-02', '1521589', 'ACTIVE'), ('11/2025', 11, 8, 'OATS', '2025-06-18', 23.5, 28500, 669750, 180, 'NAS-2025-001', '31328083', '2025-06-19', '1521590', 'ACTIVE'), ('12/2025', 12, 9, 'RYE', '2025-07-03', 24.0, 26000, 624000, 190, 'IGE-2025-001', '31328084', '2025-07-04', '1521591', 'ACTIVE'), ('13/2025', 1, 10, 'BARLEY-MALTING', '2025-07-20', 26.0, 35000, 910000, 250, 'RMC-2025-002', '31328085', '2025-07-21', '1521592', 'ACTIVE'), ('14/2025', 2, 1, 'WHEAT-PROTEIN', '2025-08-05', 22.8, 42000, 957600, 280, 'GFI-2025-002', '31328086', '2025-08-06', '1521593', 'ACTIVE'), ('15/2025', 3, 2, 'SUNFLOWER-SEEDS', '2025-08-22', 25.8, 38000, 980400, 220, 'NGN-2025-002', '31328087', '2025-08-23', '1521594', 'ACTIVE'), ('16/2025', 4, 3, 'CANOLA', '2025-09-08', 24.2, 48000, 1161600, 260, 'ECG-2025-002', '31328088', '2025-09-09', '1521595', 'ACTIVE'), ('17/2025', 5, 4, 'FLAXSEED', '2025-09-25', 23.0, 52000, 1196000, 290, 'APT-2025-002', '31328089', '2025-09-26', '1521596', 'ACTIVE'), ('18/2025', 6, 5, 'MILLET', '2025-10-10', 21.5, 31000, 666500, 180, 'MFS-2025-002', '31328090', '2025-10-11', '1521597', 'ACTIVE'), ('19/2025', 7, 6, 'BUCKWHEAT', '2025-10-28', 23.8, 33000, 785400, 200, 'BGC-2025-002', '31328091', '2025-10-29', '1521598', 'ACTIVE'), ('20/2025', 8, 7, 'QUINOA', '2025-11-12', 20.5, 85000, 1742500, 350, 'SFM-2025-002', '31328092', '2025-11-13', '1521599', 'ACTIVE');"`, { stdio: 'inherit' });
      
      
      console.log('🚢 Adding shipments...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO shipments (contract_id, container_number, booking_no, bl_number, aak_del_no, po_eta, etd, bl_date, eta, tonnes_delivered, status) VALUES (1, 'MSDU 2844042', '229ISE0067724', 'BL2025001', 'AAK001', '2025-04-23', '2025-03-14', '2025-03-19', '2025-05-05', 4.255, 'IN_TRANSIT'), (2, 'TCLU 9876543', '229ISE0067725', 'BL2025002', 'AAK002', '2025-05-15', '2025-04-10', '2025-04-15', '2025-05-30', 24.8, 'DELIVERED'), (3, 'GESU 1234567', '229ISE0067726', 'BL2025003', 'AAK003', '2025-06-20', '2025-05-12', '2025-05-18', '2025-07-05', 26.9, 'PENDING'), (4, 'HLXU 8901234', '229ISE0067727', 'BL2025004', 'AAK004', '2025-07-10', '2025-06-05', '2025-06-12', '2025-07-25', 26.2, 'IN_TRANSIT'), (5, 'MSKU 5678901', '229ISE0067728', 'BL2025005', 'AAK005', '2025-08-15', '2025-07-08', '2025-07-14', '2025-08-28', 24.6, 'PENDING'), (6, 'TEMU 2345678', '229ISE0067729', 'BL2025006', 'AAK006', '2025-09-12', '2025-08-10', '2025-08-16', '2025-09-30', 25.3, 'PENDING'), (7, 'FCIU 3456789', '229ISE0067730', 'BL2025007', 'AAK007', '2025-06-25', '2025-05-20', '2025-05-25', '2025-07-08', 21.8, 'DELIVERED'), (8, 'CXDU 4567890', '229ISE0067731', 'BL2025008', 'AAK008', '2025-07-18', '2025-06-12', '2025-06-18', '2025-08-02', 24.3, 'IN_TRANSIT'), (9, 'BMOU 5678901', '229ISE0067732', 'BL2025009', 'AAK009', '2025-08-22', '2025-07-15', '2025-07-20', '2025-09-05', 26.6, 'PENDING'), (10, 'SUDU 6789012', '229ISE0067733', 'BL2025010', 'AAK010', '2025-09-30', '2025-08-25', '2025-08-30', '2025-10-15', 25.0, 'PENDING'), (11, 'PONU 7890123', '229ISE0067734', 'BL2025011', 'AAK011', '2025-08-28', '2025-07-22', '2025-07-28', '2025-09-12', 23.3, 'DELIVERED'), (12, 'CMAU 8901234', '229ISE0067735', 'BL2025012', 'AAK012', '2025-09-15', '2025-08-08', '2025-08-14', '2025-09-28', 23.8, 'IN_TRANSIT'), (13, 'OOLU 9012345', '229ISE0067736', 'BL2025013', 'AAK013', '2025-10-20', '2025-09-14', '2025-09-19', '2025-11-05', 25.8, 'PENDING'), (14, 'NYKU 0123456', '229ISE0067737', 'BL2025014', 'AAK014', '2025-10-08', '2025-09-02', '2025-09-07', '2025-10-22', 22.6, 'DELIVERED'), (15, 'ZIMU 1234567', '229ISE0067738', 'BL2025015', 'AAK015', '2025-11-25', '2025-10-18', '2025-10-24', '2025-12-08', 25.6, 'PENDING'), (16, 'TTNU 2345678', '229ISE0067739', 'BL2025016', 'AAK016', '2025-11-12', '2025-10-05', '2025-10-11', '2025-11-28', 24.0, 'IN_TRANSIT'), (17, 'UACU 3456789', '229ISE0067740', 'BL2025017', 'AAK017', '2025-12-18', '2025-11-22', '2025-11-28', '2026-01-02', 22.8, 'PENDING'), (18, 'CSLU 4567890', '229ISE0067741', 'BL2025018', 'AAK018', '2025-12-05', '2025-11-08', '2025-11-14', '2025-12-20', 21.3, 'PENDING'), (19, 'DFSU 5678901', '229ISE0067742', 'BL2025019', 'AAK019', '2026-01-15', '2025-12-10', '2025-12-16', '2026-01-30', 23.6, 'PENDING'), (20, 'EGLV 6789012', '229ISE0067743', 'BL2025020', 'AAK020', '2026-01-28', '2025-12-22', '2025-12-28', '2026-02-12', 20.3, 'PENDING');"`, { stdio: 'inherit' });
      
      
      console.log('💰 Adding invoices...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO invoices (contract_id, principal_invoice_no, principal_invoice_date, invoice_due_date, invoiced_amount_c, status) VALUES (1, '5290455199', '2025-03-14', '2025-05-13', 1540310, 'PENDING'), (2, '5290455200', '2025-04-10', '2025-06-09', 800000, 'PAID'), (3, '5290455201', '2025-05-12', '2025-07-11', 750000, 'SENT'), (4, '5290455202', '2025-06-05', '2025-08-04', 786000, 'PENDING'), (5, '5290455203', '2025-07-08', '2025-09-06', 1424800, 'PENDING'), (6, '5290455204', '2025-08-10', '2025-10-09', 784050, 'PENDING'), (7, '5290455205', '2025-05-20', '2025-07-19', 2720000, 'PAID'), (8, '5290455206', '2025-06-12', '2025-08-11', 1092500, 'SENT'), (9, '5290455207', '2025-07-15', '2025-09-13', 902200, 'PENDING'), (10, '5290455208', '2025-08-25', '2025-10-24', 723800, 'PENDING'), (11, '5290455209', '2025-07-22', '2025-09-20', 662750, 'PAID'), (12, '5290455210', '2025-08-08', '2025-10-07', 618000, 'SENT'), (13, '5290455211', '2025-09-14', '2025-11-13', 902000, 'PENDING'), (14, '5290455212', '2025-09-02', '2025-11-01', 948600, 'PAID'), (15, '5290455213', '2025-10-18', '2025-12-17', 971400, 'PENDING'), (16, '5290455214', '2025-10-05', '2025-12-04', 1150600, 'SENT'), (17, '5290455215', '2025-11-22', '2026-01-21', 1186000, 'PENDING'), (18, '5290455216', '2025-11-08', '2026-01-07', 660500, 'PENDING'), (19, '5290455217', '2025-12-10', '2026-02-08', 778400, 'PENDING'), (20, '5290455218', '2025-12-22', '2026-02-20', 1728500, 'PENDING');"`, { stdio: 'inherit' });
      
      
      console.log('📋 Adding audit log entries...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO audit_log (table_name, record_id, operation, user_id, old_data, new_data) VALUES ('contracts', 1, 'INSERT', 1, NULL, 'plb_reference:1/2025,client_id:1'), ('shipments', 1, 'INSERT', 1, NULL, 'container_number:MSDU_2844042'), ('invoices', 1, 'INSERT', 1, NULL, 'principal_invoice_no:5290455199'), ('contracts', 2, 'INSERT', 2, NULL, 'plb_reference:2/2025,client_id:2'), ('shipments', 2, 'UPDATE', 2, 'status:IN_TRANSIT', 'status:DELIVERED'), ('invoices', 2, 'UPDATE', 2, 'status:PENDING', 'status:PAID');"`, { stdio: 'inherit' });
      
      console.log('✅ Comprehensive sample data added successfully!');
      console.log('📦 Added data to all tables:');
      console.log('   - 10 Principals');
      console.log('   - 12 Clients'); 
      console.log('   - 20 Contracts');
      console.log('   - 20 Shipments');
      console.log('   - 20 Invoices');
      console.log('   - 6 Audit entries');
      
    } else {
      console.log('✅ Data already exists in database.');
    }
    
    
    console.log('🔍 Verifying data across all tables...');
    execSync('pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "SELECT COUNT(*) as principals FROM principals; SELECT COUNT(*) as clients FROM clients; SELECT COUNT(*) as contracts FROM contracts; SELECT COUNT(*) as shipments FROM shipments; SELECT COUNT(*) as invoices FROM invoices; SELECT COUNT(*) as audit_entries FROM audit_log;"', { stdio: 'inherit' });
    
    console.log('');
    console.log('🚀 Database ready with complete dataset!');
    console.log('💡 Start dev server with: pnpm run local:dev');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();