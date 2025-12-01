import { Table,
         eq,
         like,
         or
 } from "drizzle-orm";
import type { AnyD1Database } from "drizzle-orm/d1";

import { RetrievalRepository } from "../interfaces/retrievalRepository";
import { RepositoryConfig } from "../interfaces/repositoryConfig";
import { getDb } from "@/db/index";

export default function createRetrievalRepository<T extends Table> (
    config: RepositoryConfig<T>,
    env: { DB: AnyD1Database }
): RetrievalRepository<T['$inferSelect'], T['$inferInsert']> {
    const db = getDb(env);

    return {
        async create(data) {
            try {
                const result = await db.insert(config.table).values(data).returning();
                return { success: true, data: result[0] };
            }
            catch (error) {
                return { success: false, error: { code: 500, message: "Database error during creation" } };
            }
        },

        async findMany(search) {
            try {
                if (!search || search.trim() === "") {
                    const result = await db.select().from(config.table);
                    return { success: true, data: result };
                }

                const value = `%${search.toLowerCase()}%`;
                const conditions = config.searchFields.map(field =>
                    like(config.table[field] as any, value)
                );

                const result = await db
                    .select()
                    .from(config.table)
                    .where(or(...conditions));

                return { success: true, data: result };
            } catch (error) {
                return { success: false, error: { code: 500, message: "Database error during search" } };
            }
        },

        async find(id) {
            try {
                const result = await db
                    .select()
                    .from(config.table)
                    .where(eq(config.table[config.idField] as any, id));
                return { success: true, data: result[0] ?? null };
            } catch (error) {
                return { success: false, error: { code: 500, message: "Database error during find" } };
            }
        },

        async update(id, patch) {
            try {
                await db.update(config.table)
                    .set(patch)
                    .where(eq(config.table[config.idField] as any, id));
                return { success: true, data: { id } };
            } catch (error) {
                return { success: false, error: { code: 500, message: "Database error during update" } };
            }
        },

        async remove(id) {
            try {
                await db.delete(config.table).where(eq(config.table[config.idField] as any, id));
                return { success: true, data: { id } };
            } catch (error) {
                return { success: false, error: { code: 500, message: "Database error during deletion" } };
            }
        }
    };
}