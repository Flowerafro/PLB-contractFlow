import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel
} from "@tanstack/react-table";
import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";
import type { TableGenerationProps } from "@/features/tables/interfaces/tableGenerationProps";
import { useState } from "react";


export default function TableGeneration<T>({ data, columnConfig, onRowClick, meta, columnWidth = 'auto' }: TableGenerationProps<T> & { onRowClick?: (row: T) => void; meta?: any }) {
    const [hoveredShipmentId, setHoveredShipmentId] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const columnHelper = createColumnHelper<T>();

    //  Gjenbrukbar kolonne-funksjon:
    const columns = columnConfig.map((config: ColumnSetup<T>) =>
        columnHelper.accessor(config.key as any, {
            id: String(config.key),
            header: () => <span>{config.header}</span>,
            cell: config.cell ? config.cell : info => {
                const value = info.getValue();
                return config.formatter ? config.formatter(value) : String(value || "");
            },
            enableSorting: true,
        })
    );

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