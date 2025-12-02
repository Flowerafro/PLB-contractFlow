/*

Shipment type ikke bruk nå før DB er satt opp. 
Strukturert opp etter clients tabell fra DB i schema.ts

*/

export interface Shipment {
    id: number;
    contractId: number;
    containerNumber?: string | null;
    bookingNo?: string | null;
    blNumber?: string | null;
    aakDelNo?: string | null;
    poEta?: string | null;
    etd?: string | null;
    blDate?: string | null;
    eta?: string | null;
    tonnesDelivered?: number | null;
    createdAt?: string | null;
}