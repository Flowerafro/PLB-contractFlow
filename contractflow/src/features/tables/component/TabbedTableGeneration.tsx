import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
//    SortingFn,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";
import type { TabbedTableProps } from "@/features/tables/interfaces/tabbedTableProps";
import { 
    useState,
    useMemo,
    useEffect
 } from "react";


export default function TabbedTableGeneration<T extends Record<string, any>>({ data, columnConfig, groupByColumn, onRowClick }: TabbedTableProps<T> & { onRowClick?: (row: T) => void }){
    const [sorting, setSorting] = useState<SortingState>([]);
    const [hoveredShipmentId, setHoveredShipmentId] = useState<string | null>(null);    

    const columnHelper = createColumnHelper<T>();
    const uniqueValues = useMemo(() =>
        Array.from(new Set(data.map(item => item[groupByColumn]))),
        [data, groupByColumn]
    );

    const tabCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        uniqueValues.forEach(value => {
            counts[String(value)] = data.filter(item => item[groupByColumn] === value).length;
        });
        return counts;
    }, [data, groupByColumn, uniqueValues]);

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

    const [selectedTab, setSelectedTab] = useState(() => uniqueValues[0]);

    useEffect(() => {
        if (uniqueValues.length> 0 && !uniqueValues.includes(selectedTab)) {
            setSelectedTab(uniqueValues[0]);
        }
    }, [uniqueValues, selectedTab]);

    const filteredData = data.filter(
        item => item[groupByColumn] === selectedTab
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return(
        <>
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #ccc',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px 8px 0 0'   
            }}>
                {uniqueValues.map((value, index) => (
                    <button
                        key={String(value)}
                        onClick={() => {
                            setSelectedTab(value);
                        }}
                        style={{
                            padding: '12px 20px',
                            border: 'none',
                            backgroundColor: selectedTab === value ? '#ffffff' : 'transparent',
                            borderBottom: selectedTab === value ? '2px solid #007bff' : 'none',
                            cursor: 'pointer',
                            fontWeight: selectedTab === value ? 'bold' : 'normal',
                            color: selectedTab === value ? '#007bff' : '#666',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (selectedTab !== value) {
                                e.currentTarget.style.backgroundColor = 'gray';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedTab !== value) {
                                e.currentTarget.style.backgroundColor ='transparent'
                            }
                        }}
                    >
                        {String(value)} ({tabCounts[String(value)] || 0})
                    </button>
                ))}
            </div>
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
        </>
    )
}