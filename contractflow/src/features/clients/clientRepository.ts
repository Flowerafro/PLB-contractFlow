// kode inspirert fra https://github.com/mariuswallin/hiof-2025-webapp-demo/blob/main/src/features/tasks/tasksRepository.ts
// Ligger klart for når databasen er satt opp

import { getDb } from '../../db/index'
import { clients } from '../../db/schema/schema'
import { eq, or, like, sql } from 'drizzle-orm'

import type { CreateClientInput } from '../fileHandling/interfaces/createClientInput'
import type { DBClient, DBClientInsert } from "../../db/schema/schema";


export interface ClientRepository {
    create(data: DBClientInsert): Promise<{ data?: DBClient; error?: any }>;
    findMany(search?: string): Promise<{ data?: DBClient[]; error?: any }>;
    find(id: number): Promise<{ data?: DBClient; error?: any }>;
    update(id: number, patch: Partial<CreateClientInput>): Promise<{ data?: { id: number }; error?: any }>;
    remove(id: number): Promise<{ data?: { id: number }; error?: any }>;
}

export function createClientRepository(): ClientRepository {
    const db = getDb();

    return {
        async create(data) {
            try {
                const result = await db.insert(clients).values(data).returning();
                return { data: result[0] };
            } catch (error) {
                return { error };
            }
        },

        async findMany(search) {
            try {
                if (!search || search.trim() === "") {
                    const result = await db.select().from(clients);
                    return { data: result };
                }

                const value = `%${search.toLowerCase()}%`;

                const result = await db
                    .select()
                    .from(clients)
                    .where(
                        or(
                            like(clients.name, value),
                            like(clients.email, value),
                            like(clients.phone, value),
                            like(clients.country, value),
                            like(clients.customerCode, value)
                        )
                    );

                return { data: result };
            } catch (error) {
                return { error };
            }
        },

        async find(id) {
            try {
                const result = await db.select().from(clients).where(eq(clients.id, id));
                return { data: result[0] ?? null };
            } catch (error) {
                return { error };
            }
        },

        async update(id, patch) {
            try {
                await db.update(clients).set(patch).where(eq(clients.id, id));
                return { data: { id } };
            } catch (error) {
                return { error };
            }
        },

        async remove(id) {
            try {
                await db.delete(clients).where(eq(clients.id, id));
                return { data: { id } };
            } catch (error) {
                return { error };
            }
        },
    };
}