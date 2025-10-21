// RetrieveTableData - Typen anvendt i eksperimenter med tabellvisning av json-filer:
export type Book = {
    title: string;
    author: string;
    year: number;
    genre: string;
    country: string;
    language: string;
    pages: number;
    rating: number;
    isbn: string;
    publisher: string;
}

// Parseexcel - Objekt-typen for etablering av enkelt tabell:
export type Person = {
    id: number;
    name: string;
    age?: number;
};

// HovedListen
export type HovedListeItem = {
    plbReference: Date;
    plbOrderData: Date;
    customer: string;
    product: string;
    tonn: number;
    priceUsdMt: number;
    totalPriceUsd: number;
    prisgrProv: number;
    poEta: Date;
    etd: Date;
    customerOrderNumber: string;
    principalContractNumber: number;
    principalContractDate: Date;
    principalOrderNumber: number;
    containerNumber: string;
    principalInvoiceNumber: number;
    principalInvoiceDate: Date;
    invoiceDueDate: Date;
    tonnesDeliveres: number;
    invoiceAmount: number;
    blDate: Date;
    eta: Date;
    bookingNumber: string;
    blNumber: string;
    aakDelNumber: number;
}