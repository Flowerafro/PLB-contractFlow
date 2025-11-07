/*

Contract type ikke bruk nå før DB er satt opp. 
Strukturert opp etter clients tabell fra DB i schema.ts

*/


export interface Contract {
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