import { useState } from "react";
import { 
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel
} from "@tanstack/react-table";

import useTableColumns from "@/features/tables/hooks/useTableColumns";
import useTableState from "@/features/tables/hooks/useTableState";

import type { TableGenerationProps } from "@/features/tables/interfaces/tableGenerationProps";
import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

export default function TableGeneration<T>({ data, columnConfig, onRowClick, meta, columnWidth = 'auto' }: TableGenerationProps<T> & { onRowClick?: (row: T) => void; meta?: any }) {
    const [hoveredShipmentId, setHoveredShipmentId] = useState<string | null>(null);
    const { sorting, setSorting, pagination, setPagination } = useTableState();

    const columns = useTableColumns<T>(columnConfig);


    const table = useReactTable({
        data,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(), 
        meta,
        initialState: {pagination: { pageSize: 10 }}
    });

    return(
        <>
            <div className="
                w-[100%] 
                my-4 
                overflow-x-auto 
                border 
                border-gray-400 
                rounded-lg"
            >
                <table id="contracts-table" className="border-collapse w-[100%]">
                    <thead className="w-fit">
                    {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}  className={`border border-gray-300 p-2 ${
                                        header.column.getCanSort() ? "cursor-pointer" : ""
                                    }`} style={{ width: columnWidth }}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' ▲' : ' ▼') : ''}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                            <tr 
                            key={row.id}
                            onClick={() => onRowClick?.(row.original as T)}
                            className={`${onRowClick ? "cursor-pointer" : "cursor-default"} ${
                                hoveredShipmentId === row.id ? "bg-gray-100" : ""
                            }`}
                            onMouseEnter={() => setHoveredShipmentId(row.id)}
                            onMouseLeave={() => setHoveredShipmentId(null)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} 
                                        className="
                                            border 
                                            border-gray-300 
                                            p-2 
                                            m-0"
                                        style={{ width: columnWidth }}
                                        >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="
                flex 
                items-center 
                justify-between 
                p-4"
            >
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {table.getState().pagination.pageIndex +1} of {table.getPageCount()}
                    </span>
                    <button onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                    className="border rounded p-1"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}