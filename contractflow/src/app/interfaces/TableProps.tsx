import { createColumnHelper } from "@tanstack/react-table";

// Interface for props brukt i genererng av tabell-struktur

interface TableGenerationProps<T>{
    data: T[];
    columnConfig: Array<{
        key: keyof T;
        header: string;
        cellRenderer?: (value: T[keyof T]) => React.ReactNode;
    }>
}

export default function TableGeneration<T>({ data, columnConfig }: TableGenerationProps<T>) {
    const columnHelper = createColumnHelper<T>();
}