"use client";

import Header from "../../components/Header";
import TableView from "../tableRelated/InactiveTableView";
import ParseExcel from "../file_handling/ParseExcel";
import XLSXToJSONConverter from '../file_handling/XLSXToJSON';
import TableGeneration from "../tableRelated/table_presentation/TableGeneration";
import { BookTableColumns } from "../tableRelated/table_column_structure/BookTableColumns";

export default function Layout(){
    return (
        <>
        {/* Header vises øverst på siden */}
        <Header />

        <section>
            <h1>Welcome to the Dashboard</h1>
            <p> Her kommer et komponent som vi dynamisk endrer</p>
        </section>

        <footer>
            <p>Footer content goes here</p>
        </footer>
        </>
    )
}