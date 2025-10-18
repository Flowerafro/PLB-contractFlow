import TableView from "./Components/TableView";
import TableMain from './DatabaseExport/TableMain';
import ParseExcel from "./FileHandling/ParseExcel";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';
import { BookTableColumns } from "./PotTableContents/BookTable";
import useData from "./DatabaseExport/useData";

export default function Layout(){
    function FullBookTable(){
        const { data, loading, error } = useData();
    }

    return (
        <>
            <ParseExcel />
            <TableView />
            <XLSXToJSONConverter />
            <TableMain data={data} columnConfig={BookTableColumns} />
        </>
    )
}