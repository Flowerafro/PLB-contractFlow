import type { Book } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for bøker-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Arbeid benyttet i eksperiment. Kan slettes eller 
    redigeres.
*/

export const BookTableColumns: ColumnSetup<Book>[] = [
    { key: "title", header: "Title" },
    { key: "author", header: "Author" },
    { key: "year", header: "Year" },
    { key: "genre", header: "Genre" },
    { key: "country", header: "Country" },
    { key: "language", header: "Language" },
    { key: "pages", header: "Pages" },
    { key: "rating", header: "Rating" },
    { key: "isbn", header: "ISBN" },
    { key: "publisher", header: "Publisher" },
];
