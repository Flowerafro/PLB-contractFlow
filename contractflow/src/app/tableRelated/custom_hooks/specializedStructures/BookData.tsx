import UseData from '@/app/tableRelated/custom_hooks/UseData';
import { Book } from '@/app/types/types';

/*
    -Henter data fra json-fil knyttet til bøker-
    Benyttet som et eksempel i arbeidet (kan slettes)
*/

export function BookData(){
    return UseData<Book>({
        path: '../../resources/data/books/classicBooks.csv',
        dataPath: '0.data',
        transform: (rawBooks: any[]) => rawBooks.map((book: any) => ({
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
        })),
        errorMessage: 'Books did not load'
    });
}