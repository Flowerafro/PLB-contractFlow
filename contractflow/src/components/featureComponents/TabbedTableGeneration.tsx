import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";
import type { TabbedTableProps } from "@/features/tables/interfaces/tabbedTableProps";
import { 
    useState,
    useMemo,
    useEffect,
    useCallback,
    memo
 } from "react";

// Komponent for tabbede tabeller
function TabbedTableGenerationComponent<T extends Record<string, any>>({ data, columnConfig, groupByColumn, onRowClick }: TabbedTableProps<T> & { onRowClick?: (row: T) => void }){
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

    const columns = useMemo(() => 
        columnConfig.map((config: ColumnSetup<T>) =>
            columnHelper.accessor(config.key as any, {
                id: String(config.key),
                header: () => <span>{config.header}</span>,
                cell: info => {
                    const value = info.getValue();
                    return config.formatter ? config.formatter(value) : String(value || "");
                },
                enableSorting: true,
            })
        ), [columnConfig, columnHelper]);

    const [selectedTab, setSelectedTab] = useState(() => uniqueValues[0]);

    useEffect(() => {
        if (uniqueValues.length > 0 && !uniqueValues.includes(selectedTab)) {
            setSelectedTab(uniqueValues[0]);
        }
    }, [uniqueValues, selectedTab]);

    const filteredData = useMemo(() => 
        data.filter(item => item[groupByColumn] === selectedTab),
        [data, groupByColumn, selectedTab]
    );

    const handleTabSelect = useCallback((value: any) => {
        setSelectedTab(value);
    }, []);

    const handleMouseEnter = useCallback((rowId: string) => {
        setHoveredShipmentId(rowId);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredShipmentId(null);
    }, []);

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
<div className="overflow-x-auto w-full">
  <div className="flex border-b border-gray-300 bg-gray-100 rounded-lg w-max">
    {uniqueValues.map((value, index) => (
      <button
        key={String(value)}
        onClick={() => handleTabSelect(value)}
        className={`
          px-5 py-3 whitespace-nowrap
          border-none transition-all
          ${selectedTab === value ? 
            "bg-white font-bold border-b-2 border-green-800 text-green-800" :
            "bg-transparent text-gray-600 hover:bg-gray-300"
          }
        `}
      >
        {String(value)} ({tabCounts[String(value)] || 0})
      </button>
    ))}
  </div>
</div>


<div className="w-full overflow-x-auto mt-4 border border-gray-400 rounded-lg">
  <table id="contracts-table" className="border-collapse w-full">

                    <thead className="w-fit">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                   <th
                                   key={header.id}
                                   className={`border border-gray-300 bg-gray-100 p-2 
                                               ${header.index === 0 ? "pl-4" : "pl-2"}`}
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
                            className={`
                                transition-colors
                                ${onRowClick ? "cursor-pointer" : "cursor-default"}
                                ${hoveredShipmentId === row.id ? "bg-gray-100" : ""}
                            `}
                            onMouseEnter={() => handleMouseEnter(row.id)}
                            onMouseLeave={handleMouseLeave}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}
                                    className={`border border-gray-300 p-2 
                                                ${cell.column.id === table.getAllColumns()[0].id ? "pl-4" : "pl-2"}`}
                                        >
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

const TabbedTableGeneration = memo(TabbedTableGenerationComponent) as typeof TabbedTableGenerationComponent;

export default TabbedTableGeneration;
