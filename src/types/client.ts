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
    createdAt?: string | Date | null;
/*    
    customer?: string;
    relation?: string;
    contactperson?: string;
    title?: string;
*/
    }

