import { createContractRepository } from "../../src/features/contracts/contractRepository"
import type { CreateContractInput } from "../../src/features/fileHandling/interfaces/CreateContractInput"

export const onRequestGet: PagesFunction = async (context) => {
  try {
    const id = Number(context.params.id)
    const repo = createContractRepository((context as any).env)

    const { data, error } = await repo.find(id)

    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404
      })
    }

    return new Response(JSON.stringify({ contract: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400
    })
  }
}

export const onRequestPut: PagesFunction = async (context) => {
  try {
    const id = Number(context.params.id)
    const updates = (await context.request.json()) as Partial<CreateContractInput>

    const repo = createContractRepository((context as any).env)
    const { data, error } = await repo.update(id, updates)

    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ updated: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400
    })
  }
}

export const onRequestDelete: PagesFunction = async (context) => {
  try {
    const id = Number(context.params.id)
    const repo = createContractRepository((context as any).env)

    const { data, error } = await repo.remove(id)

    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({ deleted: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400
    })
  }
}
