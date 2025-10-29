export interface Client {
    id: string;
    customerCode?: string;
    customer?: string;
    contactperson?: string;
    title?: string;
    email?: string;
    phone?: string;
    country?: string;
}

export const dummyClients: Client[] = [
    { id: "1", customerCode: "CL-0001", customer: "Nordic Supplies AS", contactperson: "Lars Hansen", title: "Project Manager", email: "lars@nordicsupplies.no", phone: "+47 98765432", country: "Norway" },
    { id: "2", customerCode: "CL-0002", customer: "Baltic Traders", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@baltictraders.pl", phone: "+48 123456789", country: "Poland" },
    { id: "3", customerCode: "CL-0003", customer: "Scandinavian Woods", contactperson: "Erik Svensson", title: "Logistics Manager", email: "erik@scandwoods.se", phone: "+46 987654321", country: "Sweden" },
    { id: "4", customerCode: "CL-0004", customer: "Euro Forest Ltd", contactperson: "Maria Schmidt", title: "Logistics Manager", email: "maria@euroforest.de", phone: "+49 234567890", country: "Germany" },
    { id: "5", customerCode: "CL-0005", customer: "Alpine Wood Co", contactperson: "Jean Dupont", title: "Product Designer", email: "jean@alpinewood.fr", phone: "+33 345678901", country: "France" },
    { id: "6", customerCode: "CL-0006", customer: "Nordic Timber Group", contactperson: "Olaf Jansen", title: "Quality Assurance", email: "olaf@nordictimber.fi", phone: "+358 456789012", country: "Finland" },
    { id: "7", customerCode: "CL-0007", customer: "Baltic Wood Exports", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@balticwood.pl", phone: "+48 234567890", country: "Poland" },
    { id: "8", customerCode: "CL-0008", customer: "Nordic Trading House", contactperson: "Lars Bertilsen", title: "HR Specialist", email: "lars@nordictrading.no", phone: "+47 87654321", country: "Norway" },
    { id: "9", customerCode: "CL-0009", customer: "Baltic Marine Logistics", contactperson: "Piotr Nowak", title: "Operations Manager", email: "piotr@balticmarine.pl", phone: "+48 512345678", country: "Poland" },
    { id: "10", customerCode: "CL-0010", customer: "Arctic Timber AS", contactperson: "Ingrid Nilsen", title: "Procurement Officer", email: "ingrid@arctictimber.no", phone: "+47 90123456", country: "Norway" },
    { id: "11", customerCode: "CL-0011", customer: "Teutonic Freight GmbH", contactperson: "Klaus Becker", title: "Warehouse Supervisor", email: "klaus@teutonicfreight.de", phone: "+49 301234567", country: "Germany" },
    { id: "12", customerCode: "CL-0012", customer: "Celtic Trade Partners", contactperson: "Aoife O’Connor", title: "Customer Relations", email: "aoife@celtictrade.ie", phone: "+353 861234567", country: "Ireland" },
    { id: "13", customerCode: "CL-0013", customer: "NordSea Export", contactperson: "Mikkel Larsen", title: "Export Coordinator", email: "mikkel@nordsea.dk", phone: "+45 87654321", country: "Denmark" },
    { id: "14", customerCode: "CL-0014", customer: "Alpine Logistics SA", contactperson: "Sophie Moreau", title: "Fleet Manager", email: "sophie@alpinelogistics.fr", phone: "+33 612345678", country: "France" },
    { id: "15", customerCode: "CL-0015", customer: "Baltic Packaging", contactperson: "Tomas Petrauskas", title: "Production Planner", email: "tomas@balticpack.lt", phone: "+370 61234567", country: "Lithuania" },
    { id: "16", customerCode: "CL-0016", customer: "ScandiMetal Oy", contactperson: "Anna Virtanen", title: "Finance Manager", email: "anna@scandimetal.fi", phone: "+358 501234567", country: "Finland" },
    { id: "17", customerCode: "CL-0017", customer: "TransNord AB", contactperson: "Jonas Lindberg", title: "Fleet Operations", email: "jonas@transnord.se", phone: "+46 701234567", country: "Sweden" },
    { id: "18", customerCode: "CL-0018", customer: "Continental Freight BV", contactperson: "Eva Janssen", title: "Supply Chain Analyst", email: "eva@continentalfreight.nl", phone: "+31 612345678", country: "Netherlands" },
    { id: "19", customerCode: "CL-0019", customer: "Nordic Trading House", contactperson: "Douglas MacLeod", title: "Procurement Specialist", email: "douglas@nordictrading.uk", phone: "+44 7712345678", country: "United Kingdom" },
    { id: "20", customerCode: "CL-0020", customer: "Adriatic Shipping SRL", contactperson: "Giulia Rossi", title: "Operations Coordinator", email: "giulia@adriaticshipping.it", phone: "+39 3312345678", country: "Italy" }
];

export function getClientById(id: string) {
    return dummyClients.find((c) => c.id === id) ?? null;
}