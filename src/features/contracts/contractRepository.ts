import { getDb } from "../../db/index";
import { contracts } from "../../db/schema/schema";
import { eq, or, like } from "drizzle-orm";

import type { CreateContractInput } from "../fileHandling/interfaces/createContractInput";

// Hent Drizzle-type fra schema
export type DBContract = typeof contracts.$inferSelect;
export type DBContractInsert = typeof contracts.$inferInsert;

export interface ContractRepository {
    create(data: DBContractInsert): Promise<{ data?: DBContract; error?: any }>;
    findMany(search?: string): Promise<{ data?: DBContract[]; error?: any }>;
    find(id: number): Promise<{ data?: DBContract; error?: any }>;
    update(
        id: number,
        patch: Partial<CreateContractInput>
    ): Promise<{ data?: { id: number }; error?: any }>;
    remove(id: number): Promise<{ data?: { id: number }; error?: any }>;
}

export function createContractRepository(): ContractRepository {
    const env = process.env.NODE_ENV || "development";
    const db = getDb();

    return {
        async create(data) {
            try {
                const result = await db.insert(contracts).values(data).returning();
                return { data: result[0] };
            } catch (error) {
                return { error };
            }
        },

        async findMany(search) {
            try {
                if (!search || search.trim() === "") {
                    const result = await db.select().from(contracts);
                    return { data: result };
                }

                const value = `%${search.toLowerCase()}%`;

                const result = await db
                    .select()
                    .from(contracts)
                    .where(
                        or(
                            like(contracts.plbReference, value),
                            like(contracts.productCode, value),
                            like(contracts.customerOrderNo, value),
                            like(contracts.principalContractNo, value),
                            like(contracts.principalOrderNo, value)
                        )
                    );

                return { data: result };
            } catch (error) {
                return { error };
            }
        },

        async find(id) {
            try {
                const result = await db
                    .select()
                    .from(contracts)
                    .where(eq(contracts.id, id));

                return { data: result[0] ?? null };
            } catch (error) {
                return { error };
            }
        },

        async update(id, patch) {
            try {
                await db.update(contracts).set(patch).where(eq(contracts.id, id));
                return { data: { id } };
            } catch (error) {
                return { error };
            }
        },

        async remove(id) {
            try {
                await db.delete(contracts).where(eq(contracts.id, id));
                return { data: { id } };
            } catch (error) {
                return { error };
            }
        },
    };
}
