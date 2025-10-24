/*
    -Typer benyttet i tabell-arbeid-
    Noe er overflødig og kan redigeres senere.

*/

// Bok typen - Anvendt i eksperimenter med tabellvisning av json-filer (kan redigeres/slettes senere):

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

//  Person typen - Brukt i eksperiment med etablering av tabell(Benyttet i Parseexcel):
export type Person = {
    id: number;
    name: string;
    age?: number;
};

// HovedListen typen - Her er dato verdier i String på grunn av problemer med dato format i json filen:
//                     En samtale for fremtiden er om dette er nyttig med tanke på innkommende xslx data.
//                     Minus: Om man vil ha fremtidige funksjoner knyttet til datoer/kalendere/påminnelser.
export type HovedListeItem = {
    plbReference: string;
    plbOrderData: string;
    customer: string;
    product: string;
    tonn: number;
    priceUsdMt: number;
    totalPriceUsd: number;
    prisgrProv: number;
    poEta: string;
    etd: string;
    customerOrderNumber: string;
    principalContractNumber: number;
    principalContractDate: string;
    principalOrderNumber: number;
    containerNumber: string;
    principalInvoiceNumber: number;
    principalInvoiceDate: string;
    invoiceDueDate: string;
    tonnesDeliveres: number;
    invoiceAmount: number;
    blDate: string;
    eta: string;
    bookingNumber: string;
    blNumber: string;
    aakDelNumber: number;
}
