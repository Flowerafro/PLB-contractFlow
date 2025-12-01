export type Client = {
    id: number;
    name: string;
    customerCode?: string | null;
    email?: string | null;
    phone?: string | null;
    country?: string | null;
    status: "ACTIVE" | "INACTIVE" | string;
    createdAt?: string | Date | null;
}

