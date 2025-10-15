import ParseExcel from "./Components/ParseExcel";
import TableView from "./Components/TableView";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';
import TableMain from './DatabaseExport/TableMain';

export default function Layout(){

    return (
        <>
            <ParseExcel />
            <TableView />
            <XLSXToJSONConverter />
            <TableMain />
        </>
    )
}