// HovedListen typen 

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