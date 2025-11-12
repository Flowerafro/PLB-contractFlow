export interface ColumnSetup<T> {
    key: keyof T;
    header: string;
    width?: string;
    sortable?: boolean;
    formatter?: (value: any) => string;
} 