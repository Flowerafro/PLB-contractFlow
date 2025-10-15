import { 
    useEffect,
    useState 
} from "react";
import type { Book } from "@/app/types/types.ts";

export default function useData(){
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //  Henter data fra JSON-filen:    
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
    
    //  Dynamisk import av JSON-filen:            
                const { default: classicBooksData } = await import('@/app/resources/classic_books.json');
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
            loadData();
        }, [])
    
        return { data, loading, error };
}