"use client"

import useData from "./UseData";
import TableGeneration from "@/app/tableRelated/table_presentation/TableGeneration";
import { BookTableColumns } from "@/app/tableRelated/table_column_structure/BookTableColumns";
import {ColumnUpset } from "@/app/interfaces/ColumnSetup";

// Tidlig arbeid. Ikke i bruk etter refaktorering

interface TableMainProps<T> {
    data: T[];
    columnConfig: ColumnUpset<T>[];
}

export default function TableMain(){

//  useData filen benyttes her:    
    const { data, loading, error } = useData();

/* KI generert funksjon for tilleggelse av knapper:    
    function RowActions({ row }: { row: any}) {
        const book = row.original as Book;

        return (
            <div style={{ display: 'flex', gap: '4px'}}>
                <button
                    onClick={() => console.log('Edit:', book.title)}
                    style={{padding: '4px 8px'}}
                >
                    Edit
                </button>
                <button
                    onClick={() => console.log('Delete:', book.title)}
                    style={{padding: '4px 8px'}}
                >
                    Delete
                </button>
            </div>
        );
    }
*/
  
    if(loading) return <div>Loading books...</div>;
    if(error) return <div>Error: {error}</div>;

    return(
        <>
            <h2>Data presented in table... hopefully:</h2>
            <TableGeneration data={data} columnConfig={BookTableColumns}/>;
        </>
    )
}