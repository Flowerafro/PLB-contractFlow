import { drizzle } from "drizzle-orm/d1"
import { contracts } from "../../db/schema/schema"
import { eq } from "drizzle-orm"
import type { CreateContractInput } from "../fileHandling/interfaces/CreateContractInput"

export const createContractRepository = (env: Env) => {
  const db = drizzle(env.DB)

  return {

    // Opprett kontrakt
    async create(data: CreateContractInput) {
      try {
        const result = await db.insert(contracts).values(data).returning()
        return { data: result[0] }
      } catch (error) {
        return { error }
      }
    },

    // Hent alle kontrakter
    async list() {
      try {
        const result = await db.select().from(contracts)
        return { data: result }
      } catch (error) {
        return { error }
      }
    },

    // Finn kontrakt etter id
    async find(id: number) {
      try {
        const result = await db
          .select()
          .from(contracts)
          .where(eq(contracts.id, id))

        return { data: result[0] || null }
      } catch (error) {
        return { error }
      }
    }
  }
}
