/* 

Alt er dummy data ment for å fylle opp client sidene med relevant informasjon.

Når databasen er satt opp, skal denne fjernes og byttes ut med en datahenting

*/

export interface Client {
    id: string;
    customerCode?: string;
    customer?: string;
    relation?: string;
    contactperson?: string;
    title?: string;
    email?: string;
    phone?: string;
    country?: string;
    clientAdded?: string;
    status?: string;
}

export function addClient(newClient: Omit<Client, "id">): Client {
    const id = String(Date.now());
    const now = new Date().toISOString();

    const client: Client = {
        id,
        clientAdded: newClient.clientAdded ?? now,
        ...newClient,
    };

    dummyClients.push(client);
    return client;
}

export function getClientById(id: string) {
    return dummyClients.find((c) => c.id === id) ?? null;
}

export interface ClientShipment {
    id: number;
    contactperson?: string;
    container: string;
    customer: string;
    status?: string;
}

// midlertidig dummy-data for testing av søkefunksjonalitet
export const dummyShipments: ClientShipment[] = [
    { id: 1, container: "ABC123", customer: "Maverick Foods", status: "In transit", contactperson: "John Doe" },
    { id: 2, container: "DEF456", customer: "Sterling Products", status: "Delivered", contactperson: "Jane Smith" },
    { id: 3, container: "GHI789", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
    { id: 4, container: "JKL012", customer: "Roberts Manufacturing Co, Ltd.", status: "In transit", contactperson: "Anna Lee" },
    { id: 5, container: "MNO345", customer: "Sterling Products", status: "Delayed", contactperson: "Tom Brown" },
    { id: 6, container: "PQR678", customer: "Maverick Foods", status: "In transit", contactperson: "Lisa White" },
    { id: 7, container: "STU901", customer: "Associated Brands - Chocolate Division", status: "In transit", contactperson: "Mark Green" },
    { id: 8, container: "GHI729", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
    { id: 9, container: "JKL112", customer: "Roberts Manufacturing Co, Ltd.", status: "Delivered", contactperson: "Anna Banana" },
    { id: 10, container: "GHG711", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
    { id: 11, container: "JKE034", customer: "Swedish Kjottabulla", status: "Ready", contactperson: "Kong Karl" },
];


export interface ClientInvoice {
    id: number;
    contractID: number;
    principalInvoiceNo: string;
    principalInvoiceDate: string;
    invoiceDueDate: string;
    invoicedAmount: number;
    createdAt: string;
    status: "Paid" | "Unpaid" | "Overdue";
}

export const dummyClientInvoices: ClientInvoice[] = [
    { id: 999, contractID: 9991, principalInvoiceNo: "INV-1001", principalInvoiceDate: "2024-01-15", invoiceDueDate: "2024-02-15", invoicedAmount: 1500.00, createdAt: "2024-01-15", status: "Paid" },
    { id: 998, contractID: 9981, principalInvoiceNo: "INV-1002", principalInvoiceDate: "2024-02-10", invoiceDueDate: "2024-03-10", invoicedAmount: 2500.00, createdAt: "2024-02-10", status: "Unpaid" },
    { id: 997, contractID: 9971, principalInvoiceNo: "INV-1003", principalInvoiceDate: "2024-03-05", invoiceDueDate: "2024-04-05", invoicedAmount: 1800.00, createdAt: "2024-03-05", status: "Overdue" },
    { id: 996, contractID: 9961, principalInvoiceNo: "INV-1004", principalInvoiceDate: "2024-04-01", invoiceDueDate: "2024-05-01", invoicedAmount: 2200.00, createdAt: "2024-04-01", status: "Paid" },
    { id: 995, contractID: 9951, principalInvoiceNo: "INV-1005", principalInvoiceDate: "2024-05-20", invoiceDueDate: "2024-06-20", invoicedAmount: 3000.00, createdAt: "2024-05-20", status: "Unpaid" },
];


