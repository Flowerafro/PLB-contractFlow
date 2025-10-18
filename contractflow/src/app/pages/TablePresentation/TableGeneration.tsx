import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { Book } from "@/app/types/types.ts";
import useData from "@/app/pages/DatabaseExport/useData";
import type { ColumnUpset } from "@/app/pages/Interfaces/ColumnUpset";

interface TableGenerationProps<T>{
    data: T[];
    columnConfig: ColumnUpset<T>[];
}


export default function TableGeneration<T>({ data, columnConfig }: TableGenerationProps<T>){
    const columnHelper = createColumnHelper<T>();

//  Gjenbrukbar kolonne-funksjon:
    const columns = columnConfig.map(config =>
        columnHelper.accessor(config.key as any, {
            id: String(config.key),
            header: () => <span>{config.header}</span>,
            cell: info => {
                const value = info.getValue();
                return config.formatter ? config.formatter(value) : String(value || "");
            }
    }));

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    
    return(
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ border: '1px solid #ccc', padding: '8px', margin: '0'}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}

/*
import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { Book } from "@/app/types/types.ts";
import useData from "@/app/pages/DatabaseExport/useData";

const columnHelper = createColumnHelper<Book>();


export default function TableGeneration(){
    const { data } = useData();

//  Gjenbrukbar kolonne-funksjon:
    const createColumns = (key: keyof Book, header: String) =>
        columnHelper.accessor(key, {
            id: key,
            cell: info => info.getValue(),
            header: () => <span>{header}</span>,
            footer: props => props.column.id,
        });

        //  Tabellkolonner instansieres i en liste:        
    const bookColumns = [
        createColumns('title', 'Title'),
        createColumns('author', 'Author'),
        createColumns('year', 'Year'),
        createColumns('genre', 'Genre'),
        createColumns('country', 'Country'),
        createColumns('language', 'Language'),
        createColumns('pages', 'Pages'),
        createColumns('rating', 'Rating'),
        createColumns('isbn', 'ISBN'),
        createColumns('publisher', 'Publisher'),
    ]

    const table = useReactTable({
        data,
        columns: bookColumns,
        getCoreRowModel: getCoreRowModel(),
    });
    
    return(
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ border: '1px solid #ccc', padding: '8px', margin: '0'}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}
*/