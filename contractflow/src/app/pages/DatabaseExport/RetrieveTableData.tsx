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
 import classicBooksData from '@/app/resources/classic_books.json';

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

    const loadBooks = async () => {
        try {
            setLoading(true);
            setError(null);

            const { default: classicBooksData } = await import('@/app/resources/classic_books.json');
            const booksArray = classicBooksData[0]?.data || [];

/*
    Eksempel filen er nestet. Uten dette fille følgende linje se slik ut:
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

// KI generert funksjon:    
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
  
    const table = useReactTable({
        data,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
    });
    
//  KI generert tillegg:
    if(loading) return <div>Loading books...</div>;
    if(error) return <div>Error: {error}</div>;

    return(
        <>
            <h2>Data presented in table... hopefully:</h2>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
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