export interface ContractTest {
    id: number;
    plbReference: string;
    clientId: number;
    principalId?: number | null;
    productCode?: string | null;
    orderDate?: string | null;
    tonnPerFcl?: number | null;
    priceUsdPerMtC: number;
    totalUsdC: number;
    commissionGroupBp?: number | null;
    customerOrderNo?: string | null;
    principalContractNo?: string | null;
    principalContractDate?: string | null;
    principalOrderNo?: string | null;
    status: string;
    createdAt: string;
}

export interface ContractTestWithRelations extends ContractTest {
    clientName?: string;
    principalName?: string;
}