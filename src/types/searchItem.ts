export interface SearchItem {
    id?: number;
    plbReference?: string;
    plbOrderDate?: string;
    customer?: string;
    product?: string;
    customerOrderNumber?: string;
    principalContractNumber?: string;
    principalContractDate?: string;
    principalOrderNumber?: string;
    containerNumber?: string;
    bookingNumber?: string;
    blNumber?: string;
    poEta?: string;
    etd?: string;
    blDate?: string;
    eta?: string;
    principalInvoiceNumber?: string;
    principalInvoiceDate?: string;
    invoiceDueDate?: string;
    invoiceAmount?: number;
}


export interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}
