export interface SearchItem {
    id?: number;
    customer?: string;
    customerOrderNumber?: string;
    containerNumber?: string;
    product?: string;
    poEta?: string;
    etd?: string;
    invoiceNumber?: string;
    invoiceAmount?: string;
    bookingNumber?: string;
    blNumber?: string;
    principalContractNumber?: string;
    principalContractDate?: string;
    principalOrderNumber?: string;
}


export interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}
