import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";
import type { TableGenerationProps } from "@/features/tables/interfaces/tableGenerationProps";
import { useState } from "react";


export default function TableGeneration<T>({ data, columnConfig, onRowClick, meta, columnWidth = 'auto' }: TableGenerationProps<T> & { onRowClick?: (row: T) => void; meta?: any }) {
    const [hoveredShipmentId, setHoveredShipmentId] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
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
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta,
    });

    return(
<div className="w-[95vw] my-4 overflow-x-auto border border-gray-400 rounded-lg">

<table id="contracts-table" className="border-collapse min-w-max">

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
                                    className="border border-gray-300 p-2 m-0"
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
    )
}