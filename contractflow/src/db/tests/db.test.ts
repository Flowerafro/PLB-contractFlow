import { db } from './config';
import { principals, clients, contracts, shipments, invoices } from './schema/schema';

async function testDatabaseSetup() {
  try {
    console.log('Testing database setup...');

    // Test creating a principal
    console.log('Creating principal...');
    const [principal] = await db.insert(principals).values({
      name: 'AAK'
    }).returning();
    
    console.log('Principal created:', principal);

    // Test creating a client
    console.log('Creating client...');
    const [client] = await db.insert(clients).values({
      name: 'Test Client Ltd',
      customerCode: 'TEST001',
      email: 'test@testclient.com',
      country: 'Norway'
    }).returning();
    
    console.log('Client created:', client);

    // Test creating a contract
    console.log('Creating contract...');
    const [contract] = await db.insert(contracts).values({
      plbReference: 'PLB-TEST-001',
      clientId: client.id,
      principalId: principal.id,
      productCode: 'WHEAT-TEST',
      orderDate: '2025-01-15',
      priceUsdPerMtC: 32500,
      totalUsdC: 812500
    }).returning();
    
    console.log('Contract created:', contract);

    // Test reading data back
    console.log('Testing data retrieval...');
    const allClients = await db.select().from(clients);
    const allContracts = await db.select().from(contracts);
    
    console.log('Found', allClients.length, 'clients');
    console.log('Found', allContracts.length, 'contracts');

    console.log('Database test completed successfully!');

  } catch (error) {
    console.error('Database test failed:', error);
    throw error;
  }
}

testDatabaseSetup();