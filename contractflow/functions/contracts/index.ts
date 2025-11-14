import { createContractRepository } from "../../src/features/contracts/contractRepository"
import type { CreateContractInput } from "../../src/features/fileHandling/interfaces/CreateContractInput"

export const onRequestPost: PagesFunction = async (context) => {
  try {
    const body = (await context.request.json()) as CreateContractInput

    const repo = createContractRepository((context as any).env)
    const { data, error } = await repo.create(body)

    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ success: true, contract: data }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400
    })
  }
}

export const onRequestGet: PagesFunction = async (context) => {
  try {
    const repo = createContractRepository((context as any).env)
    const { data, error } = await repo.list()

    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ contracts: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch contracts" }), {
      status: 400
    })
  }
}
