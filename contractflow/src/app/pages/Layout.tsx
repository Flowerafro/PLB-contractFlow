"use client";

import TableView from "./Components/TableView";
import ParseExcel from "./FileHandling/ParseExcel";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';
import TableGeneration from "./TablePresentation/TableGeneration";
import useData from "./DatabaseExport/UseData";
import { BookTableColumns } from "./TableContents/BookTableColumns";


export default function Layout(){
    const { data, loading, error } = useData(); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <ParseExcel />
            <TableView />
            <XLSXToJSONConverter />
            <TableGeneration data={ data } columnConfig={BookTableColumns}  />
        </>
    )
}