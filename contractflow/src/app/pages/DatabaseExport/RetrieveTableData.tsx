"use client"

import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table";
import React, { 
    useState,
    useEffect
} from "react";

//  Typen anvendt i eksperimenter:
type Book = {
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

export default function RetrieveTableData(){
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

//  Henter data fra JSON-filen:    
    const loadBooks = async () => {
        try {
            setLoading(true);
            setError(null);

//  Dynamisk import av JSON-filen:            
            const { default: classicBooksData } = await import('@/app/Resources/classic_books.json');
            const booksArray = classicBooksData[0]?.data || [];
/*
    Eksempel filen er nestet. Uten dette ville følgende linje se slik ut:
            const transformedBooks: Book[] = classicBooksData.map((book: any) => ({
*/
            const transformedBooks: Book[] = classicBooksData[0].data.map((book: any) => ({
                title: book["Title"] || 'Unknown',
                author: book["Author"] || 'Unknown',
                year: book["Year Published"] || 0,
                genre: book["Genre"] || 'Unknown',
                country: book["Country"] || 'Unknown',
                language: book["Language"] || 'Unknown',
                pages: book["Pages"] || 0,
                rating: book["Rating"] || 0,
                isbn: book["ISBN"] || 'Unknown',
                publisher: book["Publisher"] || 'Unknown',
            }));

            setData(transformedBooks);
        }
        catch (err) {
            setError('Books did not load correctly.');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, [])

    
    const columnHelper = createColumnHelper<Book>();
    
/*    
    Eksempel-spesikk kolonne-etablering med detaljer:
    const defaultColumns = [
        columnHelper.display({
            id: 'actions',
            cell: props => <RowActions row={props.row} />,
        }),
        columnHelper.group({
            header: 'Title',
            footer: props => props.column.id,
            columns: [
                columnHelper.accessor('title', {
                    cell: info => info.getValue(),
                    header: () => <span>Title</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('author', {
                    id: 'author',
                    cell: info => info.getValue(),
                    header: () => <span>Author</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor(row => row.year, {
                    id: 'year',
                    cell: info => info.getValue(),
                    header: () => <span>Year</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('genre', {
                    id: 'genre',
                    cell: info => info.getValue(),
                    header: () => <span>Genre</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('country', {
                    cell: info => info.getValue(),
                    header: () => <span>Country</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('language', {
                    id: 'language',
                    cell: info => info.getValue(),
                    header: () => <span>Language</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('pages', {
                    id: 'pages',
                    cell: info => info.getValue(),
                    header: () => <span>Pages</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('rating', {
                    id: 'rating',
                    cell: info => info.getValue(),
                    header: () => <span>Rating</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('isbn', {
                    id: 'isbn',
                    cell: info => info.getValue(),
                    header: () => <span>ISBN</span>,
                    footer: props => props.column.id,
                }),
                columnHelper.accessor('publisher', {
                    id: 'publisher',
                    cell: info => info.getValue(),
                    header: () => <span>Publisher</span>,
                    footer: props => props.column.id,
                })
            ]
        }),
    ]
*/

//  Gjenbrukbar kolonne-funksjon:
    const createColumns = (key: keyof Book, header: String) =>
        columnHelper.accessor(key, {
            id: key,
            cell: infor => infor.getValue(),
            header: () => <span>{header}</span>,
            footer: props => props.column.id,
        });

//  Tabellkolonner instansieres i en liste:        
    const bookColumns = [
        createColumns('title', 'Title'),
        createColumns('author', 'Author'),
        createColumns('year', 'Year'),
        createColumns('genre', 'Genre'),
        createColumns('country', 'Country'),
        createColumns('language', 'Language'),
        createColumns('pages', 'Pages'),
        createColumns('rating', 'Rating'),
        createColumns('isbn', 'ISBN'),
        createColumns('publisher', 'Publisher'),
    ]

/* KI generert funksjon for tilleggelse av knapper (siktet til i utkommentert defaultColumns):    
    function RowActions({ row }: { row: any}) {
        const book = row.original as Book;

        return (
            <div style={{ display: 'flex', gap: '4px'}}>
                <button
                    onClick={() => console.log('Edit:', book.title)}
                    style={{padding: '4px 8px'}}
                >
                    Edit
                </button>
                <button
                    onClick={() => console.log('Delete:', book.title)}
                    style={{padding: '4px 8px'}}
                >
                    Delete
                </button>
            </div>
        );
    }
*/
  
    const table = useReactTable({
        data,
        columns: bookColumns,
        getCoreRowModel: getCoreRowModel(),
    });
    
//  KI generert tillegg:
    if(loading) return <div>Loading books...</div>;
    if(error) return <div>Error: {error}</div>;

    return(
        <>
            <h2>Data presented in table... hopefully:</h2>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ border: '1px solid #ccc', padding: '8px', margin: '0'}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>

                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}