import { 
    useEffect,
    useState 
} from "react";
import type { DataSource } from "@/app/interfaces/DataSource";

/*
    -Kode for omdanning av data fra JSON-filer-

    Her bearbeides data for tabell-innleggelse. 
    Denne skal være ganske anvendelig for forsjellige
    datakilder, men det må nok ha json struktur.
    Andre er ikke testet.
*/

export default function UseData<T>(dataSource: DataSource<T>){
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

//  Henter data fra JSON-filen:    
    const loadData = async () => { 
        try {
            setLoading(true);
            setError(null);

            const {default: incomingData } = await import(/* @vite-ignore */ dataSource.path);
    
            const retrievedData = dataSource.dataPath && dataSource.dataPath.trim()
                ? dataSource.dataPath.split('.').reduce((obj, key) => obj?.[key], incomingData)
                : incomingData;

            const transformedData: T[] = dataSource.transform(retrievedData);
            setData(transformedData);
        }
        catch (err) {
            setError(dataSource.errorMessage);
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        loadData();
    }, [dataSource.path, dataSource.dataPath])

    return { data, loading, error };
}

/*
    -Tidlig arbeid som inkluderer mer hardkodet løsning-

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
*/