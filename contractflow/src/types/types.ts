//    -Typer benyttet i tabell-arbeid-

// Archive typen - Benyttes på sikt i tilknytning av dokumenter i arkivet:

export type ArchiveDocument = {
    date: Date | string;
    containerNumber: string;
    customer: string;
    documentName: string;
}

/* Denne blir erstattet med Client i client.ts */
export type Clients = {
    clientNumber: string;
    customer: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    country: string;
}

//  Person typen - Brukt i eksperiment med etablering av tabell(Benyttet i Parseexcel):
export type Person = {
    id: number;
    name: string;
    age?: number;
};

// HovedListen typen - laget en egen fil for denne typen i hovedlisten.ts, så den kan slettes på sikt. 

export type HovedListeItem = {
    plbReference: string;
    plbOrderDate: Date | string;
    customer: string;
    product: string;
    tonn: number;
    priceUsdMt: number;
    totalPriceUsd: number;
    prisgrProv: number;
    poEta: Date | string;
    etd: Date | string;
    customerOrderNumber: string;
    principalContractNumber: number;
    principalContractDate: Date | string;
    principalOrderNumber: number;
    containerNumber: string;
    principalInvoiceNumber: number;
    principalInvoiceDate: Date | string;
    invoiceDueDate: Date | string;
    tonnesDeliveres: number;
    invoiceAmount: number;
    blDate: Date | string;
    eta: Date | string;
    bookingNumber: string;
    blNumber: string;
    aakDelNumber: number;
}
