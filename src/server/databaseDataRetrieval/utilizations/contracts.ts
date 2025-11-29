import { AnyD1Database } from "drizzle-orm/d1";

import { createRetrievalController } from "../controllers/retrievalController";
import { retrievalRoutes } from "../routes/retrievalRoutes";
import { contracts } from "../../../db/schema/schema";

const contractConfig = {
    table: contracts,
    searchFields: ["plbReference, productCode", "customerOrderNo"] as (keyof typeof contracts.$inferSelect)[],
    idField: "id" as keyof typeof contracts.$inferSelect,
    requiredFields: ["plbReference", "clientId"] as (keyof typeof contracts.$inferInsert)[],
    entityName: "contract"
};

export function createContractController(env: { DB: AnyD1Database }) {
    return createRetrievalController(contractConfig, env);
}

export function createContractRoutes(env: { DB: AnyD1Database }) {
    const controller = createContractController(env);
    
    return retrievalRoutes(controller, "/contracts");
}