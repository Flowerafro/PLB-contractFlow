import type { HovedListeItem } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for hovedlisten-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 
*/

export const HovedListenColumns: ColumnSetup<HovedListeItem>[] = [
    { key: "plbReference", header: "PLB Reference" },
    { key: "plbOrderData", header: "PLB Order Date" },
    { key: "customer", header: "Customer" },
    { key: "product", header: "Product" },
    { key: "tonn", header: "Tonn/FCL" },
    { key: "priceUsdMt", header: "Price USD/mt" },
    { key: "totalPriceUsd", header: "Total USD" },
    { key: "prisgrProv", header: "Prisgr. Prov" },
    { key: "poEta", header: "PO ETA" },
    { key: "etd", header: "ETD" },
    { key: "customerOrderNumber", header: "Customer Order no." },
    { key: "principalContractNumber", header: "Principal Contract no." },
    { key: "principalContractDate", header: "Principal Contract Date" },
    { key: "principalOrderNumber", header: "Principal Order no." },
    { key: "containerNumber", header: "Container no." },
    { key: "principalInvoiceNumber", header: "Principal Invoice no." },
    { key: "principalInvoiceDate", header: "Principal Invoice Date" },
    { key: "invoiceDueDate", header: "Invoice Due Date" },
    { key: "tonnesDeliveres", header: "Tonnes Delivered" },
    { key: "invoiceAmount", header: "Invoiced Amount" },
    { key: "blDate", header: "B/L Date" },
    { key: "eta", header: "ETA" },
    { key: "bookingNumber", header: "Booking no." },
    { key: "blNumber", header: "B/L no." },
    { key: "aakDelNumber", header: "AAK del no." },
];
