import { db } from '../core/config';
import { principals, clients, contracts } from '../schema/schema';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert default principal (use upsert pattern)
    let principal;
    try {
      [principal] = await db.insert(principals).values({
        name: 'AAK'
      }).returning();
      console.log('✓ Created default principal:', principal.name);
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint')) {
        const existing = await db.select().from(principals).where(eq(principals.name, 'AAK'));
        principal = existing[0];
        console.log('✓ Using existing principal:', principal.name);
      } else {
        throw error;
      }
    }

    // Insert sample clients
    const sampleClients = [
      {
        name: 'Acme Shipping Ltd',
        customerCode: 'ACME001',
        email: 'contact@acmeshipping.com',
        phone: '+47 12345678',
        country: 'Norway'
      },
      {
        name: 'Global Maritime Co',
        customerCode: 'GMT001', 
        email: 'info@globalmaritime.com',
        phone: '+47 87654321',
        country: 'Norway'
      }
    ];

    const insertedClients = await db.insert(clients).values(sampleClients).returning();
    console.log(`✓ Created ${insertedClients.length} sample clients`);

    // Insert sample contract
    const [contract] = await db.insert(contracts).values({
      plbReference: 'PLB-2025-001',
      clientId: insertedClients[0].id,
      principalId: principal.id,
      productCode: 'WHEAT-001',
      orderDate: '2025-01-15',
      tonnPerFcl: 25.0,
      priceUsdPerMtC: 32500, // $325.00 per MT in cents
      totalUsdC: 812500, // $8,125.00 total in cents
      commissionGroupBp: 150, // 1.5% in basis points
      customerOrderNo: 'ACME-PO-2025-001'
    }).returning();

    console.log('✓ Created sample contract:', contract.plbReference);

    console.log('🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();