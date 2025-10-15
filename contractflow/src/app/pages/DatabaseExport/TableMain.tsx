"use client"

import { 
    useEffect,
    useState 
} from "react";
import useData from "./useData";
import TableGeneration from "@/app/pages/TablePresentation/TableGeneration";


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
            <TableGeneration />
        </>
    )
}