import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
//    SortingFn,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnSetup } from "@/app/interfaces/ColumnSetup";
import type {TableGenerationProps} from "@/app/interfaces/TableGenerationProps";
import { useState } from "react";



export default function TableGeneration<T>({ data, columnConfig, onRowClick }: TableGenerationProps<T> & { onRowClick?: (row: T) => void }){
    const [hoveredShipmentId, setHoveredShipmentId] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const columnHelper = createColumnHelper<T>();

    //  Gjenbrukbar kolonne-funksjon:
    const columns = columnConfig.map((config: ColumnSetup<T>) =>
        columnHelper.accessor(config.key as any, {
            id: String(config.key),
            header: () => <span>{config.header}</span>,
            cell: info => {
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
    });

    return(
        <div style={{ 
                width: '90vw',
                margin: '1rem',
                overflowX: 'auto',
                border: '1px solid gray',
                borderRadius: '8px',
                }}>
            <table  style={{ 
                borderCollapse: 'collapse', 
                }}
            >
                <thead style={{ width: 'fit-content' }}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ 
                                    border: '1px solid #ccc', 
                                    padding: '8px',
                                    minWidth: '150px',
                                    cursor: header.column.getCanSort() ? 'pointer' : undefined
                                }}
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
                          style={{ cursor: onRowClick ? "pointer" : "default", backgroundColor: hoveredShipmentId === row.id ? "#f0f0f0" : undefined }}
                          onMouseEnter={() => setHoveredShipmentId(row.id)}
                          onMouseLeave={() => setHoveredShipmentId(null)}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ 
                                    minWidth: '150px',
                                    border: '1px solid #ccc', 
                                    padding: '8px', 
                                    margin: '0'}}>
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