import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { ColumnSetup } from "@/app/interfaces/ColumnSetup";
import type {TableGenerationProps} from "@/app/interfaces/TableGenerationProps";

export default function TableGeneration<T>({ data, columnConfig }: TableGenerationProps<T>){
    const columnHelper = createColumnHelper<T>();

//  Gjenbrukbar kolonne-funksjon:
    const columns = columnConfig.map((config: ColumnSetup<T>) =>
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
        <div style={{ 
                width: '90vw',
                margin: '2rem',
                overflowX: 'auto',
                border: '1px solid gray',
                borderRadius: '8px',
                }}>
            <table  style={{ 
                borderCollapse: 'collapse', 
                }}
            >
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
        </div>
    )
}

/*
    Tidlig arbeid som inkluderer mer hardkodet løsning:

import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import type { Book } from "@/app/types/types.ts";
import UseData from "@/app/tableRelated/custom_hooks/UseData";

const columnHelper = createColumnHelper<Book>();


export default function TableGeneration(){
    const { data } = UseData();

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