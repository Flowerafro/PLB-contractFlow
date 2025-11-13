import { 
    useEffect,
    useState 
} from "react";
import type { DataSource } from "@/features/tables/interfaces/dataSource";

/*
    -Kode for omdanning av data fra JSON-filer-

    Her bearbeides data for tabell-innleggelse. 
    Denne skal være ganske anvendelig for forsjellige
    datakilder, men det må nok ha json struktur.
    Andre er ikke testet.
*/

export function useData<T>(dataSource: DataSource<T>){
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
    }, []) // Remove dependencies to prevent infinite loop

    return { data, loading, error };
}