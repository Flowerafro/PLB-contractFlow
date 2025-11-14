import { createContractRepository, ContractInput } from "../../src/features/contracts/contractRepository"

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const repo = createContractRepository(env)
  const result = await repo.list()

  return new Response(JSON.stringify(result), {
    status: result.error ? 500 : 200,
    headers: { "Content-Type": "application/json" }
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const repo = createContractRepository(env)
  const data = (await request.json()) as ContractInput

  if (!data.plbReference || !data.clientId) {
    return new Response("Missing required fields", { status: 400 })
  }

  const result = await repo.create({
    plbReference: data.plbReference,
    clientId: Number(data.clientId),
    principalId: data.principalId ? Number(data.principalId) : undefined,
    productCode: data.productCode || "",
    orderDate: data.orderDate || "",
    tonnPerFcl: data.tonnPerFcl ? Number(data.tonnPerFcl) : undefined,
    priceUsdPerMtC: data.priceUsdPerMtC ? Number(data.priceUsdPerMtC) : 0,
    totalUsdC: data.totalUsdC ? Number(data.totalUsdC) : 0,
    commissionGroupBp: data.commissionGroupBp ? Number(data.commissionGroupBp) : undefined,
    customerOrderNo: data.customerOrderNo || "",
    principalContractNo: data.principalContractNo || "",
    principalContractDate: data.principalContractDate || "",
    principalOrderNo: data.principalOrderNo || "",
    status: data.status || "ACTIVE"
  })

  return new Response(JSON.stringify(result), {
    status: result.error ? 500 : 201,
    headers: { "Content-Type": "application/json" }
  })
}
