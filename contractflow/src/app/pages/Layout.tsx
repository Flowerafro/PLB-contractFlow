import { Home } from './Home';
import ParseExcel from "./Components/ParseExcel";
import TableView from "./Components/TableView";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';
import RetrieveTableData from './DatabaseExport/RetrieveTableData';

export default function Layout(){

    return (
        <>
            <ParseExcel />
            <TableView />
            <XLSXToJSONConverter />
            <RetrieveTableData />
        </>
    )
}