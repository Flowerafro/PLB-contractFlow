import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { Book } from "@/app/types/types.ts";
import useData from "@/app/pages/DatabaseExport/useData";



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