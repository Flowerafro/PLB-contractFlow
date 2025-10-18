"use client";

import { 
    ColumnDef, 
    getCoreRowModel, 
    useReactTable,
    flexRender
} from '@tanstack/react-table';
import type { Person } from '@/app/types/types';

//  TabellEksempel - Enkel tabell-visning for Person-data

// Data etableres med en liste av objekter:
const data: Person[] = [
    { id: 1, name: 'Ashley J. Williams', age: 30 },
    { id: 2, name: 'Ellen Ripley', age: 35 },
    { id: 3, name: 'Sarah Connor', age: 28 }
];

const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => <span>{String(info.getValue())}</span>
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => <span>{String(info.getValue())}</span>
    },
    {
        accessorKey: 'age',
        header: 'Age',
        cell: (info) => <span>{String(info.getValue())}</span>
    }
];

export default function TableView() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
        
    return(
        <div>
            <h2>Table View</h2>
            <p>Rows: {table.getRowModel().rows.length}</p>
            <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
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