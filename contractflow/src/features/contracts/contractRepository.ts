import { getDB } from "../../db/client"
import { contracts } from "../../db/schema/schema"
import { eq } from "drizzle-orm"

export type ContractInput = {
  plbReference: string
  clientId: number
  principalId?: number
  productCode?: string
  orderDate?: string
  tonnPerFcl?: number
  priceUsdPerMtC?: number
  totalUsdC?: number
  commissionGroupBp?: number
  customerOrderNo?: string
  principalContractNo?: string
  principalContractDate?: string
  principalOrderNo?: string
  status?: string
}

export const createContractRepository = (env: Env) => {
  const db = getDB(env)

  return {
    async create(data: ContractInput) {
      try {
        const result = await db.insert(contracts).values(data).returning()
        return { data: result[0] }
      } catch (error) {
        return { error }
      }
    },

    async list() {
      try {
        const result = await db.select().from(contracts)
        return { data: result }
      } catch (error) {
        return { error }
      }
    },

    async find(id: number) {
      try {
        const result = await db.select().from(contracts).where(eq(contracts.id, id))
        return { data: result[0] || null }
      } catch (error) {
        return { error }
      }
    },

    async update(id: number, patch: Partial<ContractInput>) {
      try {
        await db.update(contracts).set(patch).where(eq(contracts.id, id))
        return { data: { id } }
      } catch (error) {
        return { error }
      }
    },

    async remove(id: number) {
      try {
        await db.delete(contracts).where(eq(contracts.id, id))
        return { data: { id } }
      } catch (error) {
        return { error }
      }
    }
  }
}