export type CreateContractInput = {
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
  