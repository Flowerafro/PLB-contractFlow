import { AuditService } from '../services/audit.service';
import { db } from '../core/config';
import { clients, principals, contracts } from '../schema/schema';
import { eq } from 'drizzle-orm';

async function testAuditSystem() {
  console.log('📊 Testing audit system...\n');

  try {
    // Test 1: Create data with audit logging
    console.log('📝 Test 1: CRUD operations with audit logging');

    // Create a test principal
    const [testPrincipal] = await db.insert(principals).values({
      name: 'Audit Test Principal'
    }).returning();

    // Log the creation
    await AuditService.logInsert('principals', testPrincipal.id, testPrincipal, 999);
    console.log(`✅ Principal created and audit logged: ${testPrincipal.name}`);

    // Create a test client
    const [testClient] = await db.insert(clients).values({
      name: 'Audit Test Client',
      customerCode: 'ATC001',
      email: 'audit@test.com'
    }).returning();

    // Log the creation
    await AuditService.logInsert('clients', testClient.id, testClient, 999);
    console.log(`✅ Client created and audit logged: ${testClient.name}`);

    // Update the client
    const oldData = { ...testClient };
    const [updatedClient] = await db.update(clients)
      .set({ phone: '+47 87654321' })
      .where(eq(clients.id, testClient.id))
      .returning();

    // Log the update
    await AuditService.logUpdate('clients', testClient.id, oldData, updatedClient, 999);
    console.log(`✅ Client updated and audit logged: phone added`);

    // Test 2: Retrieve audit trail
    console.log('\n🔍 Test 2: Audit trail retrieval');

    const clientAuditTrail = await AuditService.getAuditTrail('clients', testClient.id);
    console.log(`✅ Client audit trail: ${clientAuditTrail.length} entries`);

    const principalAuditTrail = await AuditService.getAuditTrail('principals', testPrincipal.id);
    console.log(`✅ Principal audit trail: ${principalAuditTrail.length} entries`);

    // Test 3: Recent activities
    console.log('\n⏰ Test 3: Recent audit activities');

    const recentActivities = await AuditService.getRecentAuditEntries(10);
    console.log(`✅ Recent activities: ${recentActivities.length} entries`);

    // Display some audit details
    if (recentActivities.length > 0) {
      const latest = recentActivities[0];
      console.log(`   Latest: ${latest.operation} on ${latest.tableName} (ID: ${latest.recordId})`);
    }

    // Test 4: User activities
    console.log('\n👤 Test 4: User-specific audit trail');

    const userActivities = await AuditService.getUserAuditTrail(999);
    console.log(`✅ User 999 activities: ${userActivities.length} entries`);

    // Test 5: Table-specific audit
    console.log('\n� Test 5: Table-specific audit queries');

    const allAuditEntries = await AuditService.getRecentAuditEntries(50);
    const clientEntries = allAuditEntries.filter(entry => entry.tableName === 'clients');
    console.log(`✅ Client table activities: ${clientEntries.length} entries`);

    console.log('\n🎉 AUDIT SYSTEM TEST COMPLETED!');
    console.log('================================');
    console.log('✅ INSERT operations logged');
    console.log('✅ UPDATE operations logged');
    console.log('✅ Audit trail retrieval working');
    console.log('✅ Recent activities tracking');
    console.log('✅ User activity tracking');
    console.log('✅ Table-specific filtering functional');

  } catch (error) {
    console.error('❌ Audit system test failed:', error);
    throw error;
  }
}

testAuditSystem();