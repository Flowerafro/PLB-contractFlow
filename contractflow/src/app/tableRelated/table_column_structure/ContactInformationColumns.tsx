import type { Book } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for kontakt-info-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Ikke påbegynt.

    Slik jeg har tenkt det, vil dette referere til person-
    data i databsen. Det er ikke sikkert det er noen vits
    i å ha to tabeller for dette
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
