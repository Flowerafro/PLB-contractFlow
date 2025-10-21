// RetrieveTableData - Typen anvendt i eksperimenter med tabellvisning av json-filer:
export type Book = {
    title: string;
    author: string;
    year: number;
    genre: string;
    country: string;
    language: string;
    pages: number;
    rating: number;
    isbn: string;
    publisher: string;
}

// Parseexcel - Objekt-typen for etablering av enkelt tabell:
export type Person = {
    id: number;
    name: string;
    age?: number;
};