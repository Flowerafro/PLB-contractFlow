/**
 * Local D1 Database Seeder
 * Seeds the local D1 database with sample data for testing
 */

import { execSync } from 'child_process';

async function seedDatabase() {
  console.log('🌱 Seeding local D1 database...');
  
  try {
    // Check if we already have data
    console.log('📊 Checking current data...');
    const checkResult = execSync('pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "SELECT COUNT(*) as count FROM clients;"', { encoding: 'utf8' });
    
    // Look for the actual count value, not headers
    const hasData = checkResult.match(/│\s*(\d+)\s*│/) && !checkResult.includes('│ 0     │');
    
    if (!hasData) {
      console.log('📝 No data found, adding sample data...');
      
      // Add principals
      console.log('🏢 Adding principals...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO principals (name) VALUES ('AAK'), ('Test Principal'), ('Global Commodities Ltd'), ('Nordic Trading AS');"`, { stdio: 'inherit' });
      
      // Add clients
      console.log('👥 Adding clients...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO clients (name, customer_code, email, phone, country) VALUES ('Acme Corporation', 'ACM001', 'contact@acme.com', '+1-555-0123', 'USA'), ('Nordic Foods AS', 'NF001', 'orders@nordicfoods.no', '+47 22 33 44 55', 'Norway'), ('Global Imports Ltd', 'GI001', 'trading@globalimports.co.uk', '+44 20 7123 4567', 'United Kingdom'), ('Euro Grain GmbH', 'EG001', 'procurement@eurograin.de', '+49 40 123 456', 'Germany');"`, { stdio: 'inherit' });
      
      // Add contracts
      console.log('📄 Adding contracts...');
      execSync(`pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "INSERT OR IGNORE INTO contracts (plb_reference, client_id, principal_id, product_code, order_date, tonn_per_fcl, price_usd_per_mt_c, total_usd_c, commission_group_bp, customer_order_no) VALUES ('PLB-2024-001', 1, 1, 'WHEAT-HRW', '2024-01-15', 25.0, 32500, 812500, 150, 'ACM-2024-001'), ('PLB-2024-002', 2, 1, 'BARLEY-FEED', '2024-02-10', 27.0, 28000, 756000, 125, 'NF-2024-001'), ('PLB-2024-003', 3, 2, 'CORN-YELLOW', '2024-03-05', 26.5, 30000, 795000, 140, 'GI-2024-001'), ('PLB-2024-004', 4, 3, 'WHEAT-SOFT', '2024-04-12', 25.5, 31000, 790500, 130, 'EG-2024-001');"`, { stdio: 'inherit' });
      
      console.log('✅ Sample data added successfully!');
    } else {
      console.log('✅ Data already exists in database.');
    }
    
    // Verify data
    console.log('🔍 Verifying data...');
    execSync('pnpm exec wrangler d1 execute plb-contractflow-db --local --persist-to=.wrangler/state/local --command "SELECT COUNT(*) as clients FROM clients; SELECT COUNT(*) as contracts FROM contracts; SELECT COUNT(*) as principals FROM principals;"', { stdio: 'inherit' });
    
    console.log('');
    console.log('🚀 Database ready! Start dev server with: npm run local:dev');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();