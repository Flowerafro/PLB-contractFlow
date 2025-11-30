import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { contracts, clients, principals } from "@/db/schema/schema";
// @ts-ignore
/*import hovedListenData from "@/features/tables/dummyData/hoved_listen_paa_lissom.json";

export const seedData = async (env?: { DB: D1Database }) => {
  try {
    if (!env?.DB) {
      throw new Error('Database not available');
    }
    
    const db = drizzle(env.DB);
    
    // Clear existing data
    await db.delete(contracts);
    await db.delete(clients);
    await db.delete(principals);

    // Extract unique clients from JSON data
    const uniqueClients = Array.from(
      new Map(
        hovedListenData.map((item) => [
          item.customer,
          {
            name: item.customer,
            email: `contact@${item.customer.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            phone: "+47-555-0123", // Default Norwegian number
            customerCode: item.plbReference.split('-').slice(0, 2).join('-'),
            country: "Norway", // Default to Norway
          }
        ])
      ).values()
    );

    // Insert clients and collect their IDs
    const clientInsertPromises = uniqueClients.map(async (clientData) => {
      const [client] = await db
        .insert(clients)
        .values(clientData)
        .returning();
      return { name: clientData.name, id: client.id };
    });

    const insertedClients = await Promise.all(clientInsertPromises);
    const clientMap = new Map(insertedClients.map(c => [c.name, c.id]));

    // Extract unique principals (using principalContractNumber as identifier)
    const uniquePrincipals = Array.from(
      new Map(
        hovedListenData.map((item) => [
          item.principalContractNumber,
          {
            name: `Principal Contract ${item.principalContractNumber}`,
          }
        ])
      ).values()
    );

    // Insert principals and collect their IDs
    const principalInsertPromises = uniquePrincipals.map(async (principalData) => {
      const [principal] = await db
        .insert(principals)
        .values(principalData)
        .returning();
      return { name: principalData.name, id: principal.id, contractNumber: principalData.name.split(' ').pop() };
    });

    const insertedPrincipals = await Promise.all(principalInsertPromises);
    const principalMap = new Map(insertedPrincipals.map(p => [p.contractNumber, p.id]));

    // Map JSON data to contract format
    const contractData = hovedListenData.map((item) => ({
      plbReference: item.plbReference,
      orderDate: item.plbOrderDate,
      productCode: item.product.substring(0, 20), // Truncate if too long
      tonnPerFcl: item.tonn,
      priceUsdPerMtC: Math.round(item.priceUsdMt * 100), // Convert to cents
      totalUsdC: Math.round(item.totalPriceUsd * 100), // Convert to cents
      commissionGroupBp: 250, // Default 2.5% commission
      customerOrderNo: item.customerOrderNumber.toString(),
      principalContractNo: item.principalContractNumber.toString(),
      principalContractDate: item.principalContractDate,
      principalOrderNo: item.principalOrderNumber.toString(),
      clientId: clientMap.get(item.customer)!,
      principalId: principalMap.get(item.principalContractNumber.toString())!,
      status: "ACTIVE" as const,
    }));

    const insertedContracts = await db
      .insert(contracts)
      .values(contractData)
      .returning();

    console.log("🌱 Finished seeding hovedlisten data from JSON");
    console.log("Inserted clients:", insertedClients.length);
    console.log("Inserted principals:", insertedPrincipals.length);
    console.log("Inserted contracts:", insertedContracts.length);

    return insertedContracts;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default defineScript(async ({ env }) => {
  try {
    await seedData(env);
    return Response.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    }, { status: 500 });
  }
});
*/