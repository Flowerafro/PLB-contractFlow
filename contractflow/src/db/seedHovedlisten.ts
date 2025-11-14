import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { contracts, clients, principals } from "@/db/schema/schema";
import { env as WorkerEnv } from "cloudflare:workers";

export const seedData = async (env?: { DB: D1Database }) => {
  try {
    const db = drizzle(env?.DB ?? WorkerEnv.DB);
    
    // Clear existing data
    await db.delete(contracts);
    await db.delete(clients);
    await db.delete(principals);

    // Insert test clients
    const [client1] = await db
      .insert(clients)
      .values({
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "+1-555-0123",
        customerCode: "ACM001",
        country: "USA",
      })
      .returning();

    // Insert test principals  
    const [principal1] = await db
      .insert(principals)
      .values({
        name: "Global Steel Ltd",
      })
      .returning();

    // Insert test contracts
    const contractData = [
      {
        plbReference: "PLB-2024-001",
        orderDate: "2024-01-15",
        productCode: "STEEL-A001",
        tonnPerFcl: 25.5,
        priceUsdPerMtC: 85000, // 850.00 USD in cents
        totalUsdC: 2167500, // 21675.00 USD in cents 
        commissionGroupBp: 250, // 2.5% in basis points
        customerOrderNo: "ACM-2024-123",
        principalContractNo: "789456",
        principalContractDate: "2024-01-10",
        principalOrderNo: "555789",
        clientId: client1.id,
        principalId: principal1.id,
        status: "ACTIVE" as const,
      },
      {
        plbReference: "PLB-2024-002", 
        orderDate: "2024-01-22",
        productCode: "ALU-B002",
        tonnPerFcl: 18.2,
        priceUsdPerMtC: 120000, // 1200.00 USD in cents
        totalUsdC: 2184000, // 21840.00 USD in cents
        commissionGroupBp: 300, // 3.0% in basis points
        customerOrderNo: "ACM-2024-124",
        principalContractNo: "789457",
        principalContractDate: "2024-01-18",
        principalOrderNo: "555790",
        clientId: client1.id,
        principalId: principal1.id,
        status: "ACTIVE" as const,
      }
    ];

    const [...insertedContracts] = await db
      .insert(contracts)
      .values(contractData)
      .returning();

    console.log("🌱 Finished seeding hovedlisten data");
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