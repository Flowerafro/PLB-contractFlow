export interface columnSetup<T> {
    key: keyof T;
    header: string;
    width?: string;
    sortable?: boolean;
    formatter?: (value: any) => string;
} 