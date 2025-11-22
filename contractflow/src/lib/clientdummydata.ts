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

export const dummyClients: Client[] = [
    { id: "1", customerCode: "CL-0001", customer: "Nordic Supplies AS", relation: "Fat producer", contactperson: "Lars Hansen", title: "Project Manager", email: "lars@nordicsupplies.no", phone: "+47 98765432", country: "Norway", clientAdded: "Januar 2023", status: "Active" },
    { id: "2", customerCode: "CL-0002", customer: "Baltic Traders", relation: "Logistics provider", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@baltictraders.pl", phone: "+48 123456789", country: "Poland", clientAdded: "Februar 2023", status: "Active" },
    { id: "3", customerCode: "CL-0003", customer: "Scandinavian Woods", relation: "Wood supplier", contactperson: "Erik Svensson", title: "Logistics Manager", email: "erik@scandwoods.se", phone: "+46 987654321", country: "Sweden", clientAdded: "Mars 2022", status: "Inactive" },
    { id: "4", customerCode: "CL-0004", customer: "Euro Forest Ltd", relation: "Timber supplier", contactperson: "Maria Schmidt", title: "Logistics Manager", email: "maria@euroforest.de", phone: "+49 234567890", country: "Germany", clientAdded: "April 2013", status: "Active" },
    { id: "5", customerCode: "CL-0005", customer: "Alpine Wood Co", relation: "Wood products", contactperson: "Jean Dupont", title: "Product Designer", email: "jean@alpinewood.fr", phone: "+33 345678901", country: "France", clientAdded: "Mai 2023", status: "Active" },
    { id: "6", customerCode: "CL-0006", customer: "Nordic Timber Group", relation: "Timber industry", contactperson: "Olaf Jansen", title: "Quality Assurance", email: "olaf@nordictimber.fi", phone: "+358 456789012", country: "Finland", clientAdded: "Juni 2011", status: "Active" },
    { id: "7", customerCode: "CL-0007", customer: "Baltic Wood Exports", relation: "Wood exporter", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@balticwood.pl", phone: "+48 234567890", country: "Poland", clientAdded: "Juli 2023", status: "Active" },
    { id: "8", customerCode: "CL-0008", customer: "Nordic Trading House", relation: "Trading", contactperson: "Lars Bertilsen", title: "HR Specialist", email: "lars@nordictrading.no", phone: "+47 87654321", country: "Norway", clientAdded: "August 2007", status: "Active" },
    { id: "9", customerCode: "CL-0009", customer: "Baltic Marine Logistics", relation: "Logistics", contactperson: "Piotr Nowak", title: "Operations Manager", email: "piotr@balticmarine.pl", phone: "+48 512345678", country: "Poland", clientAdded: "September 2023", status: "Inactive" },
    { id: "10", customerCode: "CL-0010", customer: "Arctic Timber AS", relation: "Timber", contactperson: "Ingrid Nilsen", title: "Procurement Officer", email: "ingrid@arctictimber.no", phone: "+47 90123456", country: "Norway", clientAdded: "Oktober 2023", status: "Active" },
    { id: "11", customerCode: "CL-0011", customer: "Teutonic Freight GmbH", relation: "Freight", contactperson: "Klaus Becker", title: "Warehouse Supervisor", email: "klaus@teutonicfreight.de", phone: "+49 301234567", country: "Germany", clientAdded: "November 2013", status: "Active" },
    { id: "12", customerCode: "CL-0012", customer: "Celtic Trade Partners", relation: "Trade", contactperson: "Aoife O’Connor", title: "Customer Relations", email: "aoife@celtictrade.ie", phone: "+353 861234567", country: "Ireland", clientAdded: "Desember 2023", status: "Active" },
    { id: "13", customerCode: "CL-0013", customer: "NordSea Export", relation: "Export", contactperson: "Mikkel Larsen", title: "Export Coordinator", email: "mikkel@nordsea.dk", phone: "+45 87654321", country: "Denmark", clientAdded: "October 2014", status: "Active" },
    { id: "14", customerCode: "CL-0014", customer: "Alpine Logistics SA", relation: "Logistics", contactperson: "Sophie Moreau", title: "Fleet Manager", email: "sophie@alpinelogistics.fr", phone: "+33 612345678", country: "France", clientAdded: "September 2014", status: "Active" },
    { id: "15", customerCode: "CL-0015", customer: "Baltic Packaging", relation: "Packaging", contactperson: "Tomas Petrauskas", title: "Production Planner", email: "tomas@balticpack.lt", phone: "+370 61234567", country: "Lithuania", clientAdded: "2024-03-10", status: "Active" },
    { id: "16", customerCode: "CL-0016", customer: "ScandiMetal Oy", relation: "Metal", contactperson: "Anna Virtanen", title: "Finance Manager", email: "anna@scandimetal.fi", phone: "+358 501234567", country: "Finland", clientAdded: "2024-04-05", status: "Active" },
    { id: "17", customerCode: "CL-0017", customer: "TransNord AB", relation: "Transport", contactperson: "Jonas Lindberg", title: "Fleet Operations", email: "jonas@transnord.se", phone: "+46 701234567", country: "Sweden", clientAdded: "2024-05-15", status: "Active" },
    { id: "18", customerCode: "CL-0018", customer: "Continental Freight BV", relation: "Freight", contactperson: "Eva Janssen", title: "Supply Chain Analyst", email: "eva@continentalfreight.nl", phone: "+31 612345678", country: "Netherlands", clientAdded: "Desember 2022", status: "Active" },
    { id: "19", customerCode: "CL-0019", customer: "Nordic Trading House", relation: "Trading", contactperson: "Douglas MacLeod", title: "Procurement Specialist", email: "douglas@nordictrading.uk", phone: "+44 7712345678", country: "United Kingdom", clientAdded: "Mai 2017", status: "Active" },
    { id: "20", customerCode: "CL-0020", customer: "Adriatic Shipping SRL", relation: "Shipping", contactperson: "Giulia Rossi", title: "Operations Coordinator", email: "giulia@adriaticshipping.it", phone: "+39 3312345678", country: "Italy", clientAdded: "Mai 2012", status: "Active" },
];

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
    { id: 4, container: "JKL012", customer: "Nordic Foods", status: "In transit", contactperson: "Anna Lee" },
    { id: 5, container: "MNO345", customer: "PEace Products", status: "Delayed", contactperson: "Tom Brown" },
    { id: 6, container: "PQR678", customer: "Potato BBoys", status: "In transit", contactperson: "Lisa White" },
    { id: 7, container: "STU901", customer: "Veggie Delights", status: "In transit", contactperson: "Mark Green" },
    { id: 8, container: "GHI729", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
    { id: 9, container: "JKL112", customer: "Nordic Foods", status: "Delivered", contactperson: "Anna Banana" },
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


