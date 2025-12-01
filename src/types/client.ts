export type Client = {
    id: number;
    name: string;
    customerCode?: string | null;
    email?: string | null;
    phone?: string | null;
    country?: string | null;
    status?: string | any;
    createdAt?: string | Date | null;
}

