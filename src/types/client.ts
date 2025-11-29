/*

Client type ikke bruk nå før DB er satt opp. 
Strukturert opp etter clients tabell fra DB i schema.ts

*/

export interface Client {
    id: number;
    name: string;
    customerCode?: string | null;
    email?: string | null;
    phone?: string | null;
    country?: string | null;
    status: "ACTIVE" | "INACTIVE" | string;
    createdAt?: string; // per nå satt som text i SQLite
}


export interface ClientOverviewProps {
    onClientClick?: (id: string) => void;
    onNewClient?: () => void;
    clientId?: string;
}