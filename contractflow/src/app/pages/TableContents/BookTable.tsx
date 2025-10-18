import type { Book, Person } from "@/app/types/types.ts";
import { ColumnUpset } from "@/app/pages/Interfaces/ColumnUpset";

export const BookTableColumns: ColumnUpset<Book>[] = [
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

export const PersonTableColumns: ColumnUpset<Person>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
];