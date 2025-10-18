"use client";

import Header from "../../components/Header";
import TableView from "./Components/TableView";
import ParseExcel from "./FileHandling/ParseExcel";
import XLSXToJSONConverter from './FileHandling/XLSXToJSON';
import TableGeneration from "./TablePresentation/TableGeneration";
import { BookTableColumns } from "./TableContents/BookTableColumns";

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