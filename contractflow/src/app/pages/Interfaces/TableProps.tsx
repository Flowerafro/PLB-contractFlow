import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { Book } from "@/app/types/types.ts";
import useData from "@/app/pages/DatabaseExport/useData";

const columnHelper = createColumnHelper<Book>();


export interface TableProps<T>{
    data: T[];
    columnConfig: Array<{
        key: keyof TailEvent;
        header: string;
        cellRenderer?: (value: T[keyof T]) => React.ReactNode;
    }>
}
