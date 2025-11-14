

import { getDb } from '../../db/index'
import { clients } from '../../db/schema/schema'
import { eq } from 'drizzle-orm'
import type { CreateClientInput } from '../fileHandling/interfaces/createClientInput'




export const createClientRepository = () => {
    const db = getDb()

    return {
        async create(data: CreateClientInput) {
            try {
                const result = await db.insert(clients).values(data).returning()
                return { data: result[0] }
            } catch (error) {
                return { error }
            }
        },

        async list() {
            try {
                const result = await db.select().from(clients)
                return { data: result }
            } catch (error) {
                return { error }
            }
        },

        async find(id: number) {
            try {
                const result = await db.select().from(clients).where(eq(clients.id, id))
                return { data: result[0] || null }
            } catch (error) {
                return { error }
            }
        },

        async update(id: number, patch: Partial<CreateClientInput>) {
            try {
                await db.update(clients).set(patch).where(eq(clients.id, id))
                return { data: { id } }
            } catch (error) {
                return { error }
            }
        },

        async remove(id: number) {
            try {
                await db.delete(clients).where(eq(clients.id, id))
                return { data: { id } }
            } catch (error) {
                return { error }
            }
        }
    }
} 