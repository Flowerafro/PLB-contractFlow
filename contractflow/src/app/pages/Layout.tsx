import { Home } from './Home';
import ParseExcel from "./Components/ParseExcel";
import TableView from "./Components/TableView";

export default function Layout(){

    return (
        <>
            <ParseExcel />
            <TableView />
        </>
    )
}