import { 
    ColumnDef, 
    getCoreRowModel, 
    useReactTable,
    flexRender
} from '@tanstack/react-table';
import DATA from '@/app/resources/data';
import { useState } from 'react';

//  Kolonne-struktur defineres:
const columns: ColumnDef<Row>[] = [
    {
        accessorKey: 'task',
        header: 'Task',
        cell: () => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: () => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'dueDate',
        header: 'Due',
        cell: () => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
        cell: () => <p>{props.getValue()}</p>
    }
]

export default function TableView() {
    const [data, setData] = useState(DATA);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    console.log(table.getHeaderGroups());
    return(
        <article className="table">
    //        {table.getHeaderGroups().map(headerGroup =>)}
        </article>
    )
}