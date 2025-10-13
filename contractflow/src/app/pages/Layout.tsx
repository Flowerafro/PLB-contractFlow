import { Home } from './Home';
import ParseExcel from "./Components/ParseExcel";
import TableView from "./Components/TableView";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';

export default function Layout(){

    return (
        <>
            <ParseExcel />
            <TableView />
            <XLSXToJSONConverter />
        </>
    )
}