// Isolated database types without drizzle dependencies

export interface DBClient {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    contactPerson?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface DBClientInsert {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    contactPerson?: string;
}

export interface DBContract {
    id: number;
    plb_reference: string;
    client_id: number;
    principal_id: number;
    product_code: string;
    order_date: string;
    tonn_per_fcl: number;
    price_usd_per_mt_c: number;
    total_usd_c: number;
    commission_group_bp: number;
    customer_order_no?: string;
    principal_contract_no?: number;
    principal_contract_date?: string;
    principal_order_no?: number;
    status: string;
    created_at: string;
    updated_at?: string;
}