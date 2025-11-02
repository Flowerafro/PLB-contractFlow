"use client"

import UseData  from "@/app/features/tables/custom_hooks/UseData";
import TableGeneration from "@/app/features/tables/table_presentation/TableGeneration";
import { BookTableColumns } from "@/app/features/tables/table_column_structure/BookTableColumns";
import {ColumnSetup } from "@/app/interfaces/ColumnSetup";

// Tidlig arbeid. Ikke i bruk etter refaktorering

interface TableMainProps<T> {
    data: T[];
    columnConfig: ColumnSetup<T>[];
}

/*
    -Samle-komponent for tabell-visning-
    Denne kan benyttes om vi vil ha overskrift som 
    samme komponent som tabellvisningen.

    Kan være nyttig med en tittel komponent
*/

export default function TableMain(){
//  useData filen benyttes her:    
//    const { data, loading, error } = UseData();

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