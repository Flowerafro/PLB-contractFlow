import { AnyD1Database } from "drizzle-orm/d1";

import { createRetrievalController } from "../controllers/retrievalController";
import { retrievalRoutes } from "../routes/retrievalRoutes";
import { clients } from "../../../db/schema/schema";

const clientConfig = {
    table: clients,
    searchFields: ["name", "email", "customerCode"] as (keyof typeof clients.$inferSelect)[],
    idField: "id" as keyof typeof clients.$inferSelect,
    requiredFields: ["name"] as (keyof typeof clients.$inferInsert)[],
    entityName: "client"
};

export function createClientController(env: { DB: AnyD1Database }) {
    return createRetrievalController(clientConfig, env);
}

export function createClientRoutes(env: { DB: AnyD1Database }) {
    const controller = createClientController(env);
    
    return retrievalRoutes(controller, "/clients");
}