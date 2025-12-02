import { 
    useEffect,
    useState,
    useRef,
    useMemo
} from "react";
import type { DataSource } from "@/features/tables/interfaces/dataSource";

//    -Data transformation from JSON files-

export function useData<T>(dataSource: DataSource<T>){
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loadedPath = useRef<string | null>(null);

    const memoizedDataSource = useMemo(() => dataSource, [
        dataSource.path, 
        dataSource.dataPath, 
        dataSource.errorMessage
    ]);

//  Forbedret data-loading med caching:    
    const loadData = async () => { 
        if (loadedPath.current === memoizedDataSource.path && data.length > 0) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const {default: incomingData } = await import(/* @vite-ignore */ memoizedDataSource.path);
    
            const retrievedData = memoizedDataSource.dataPath && memoizedDataSource.dataPath.trim()
                ? memoizedDataSource.dataPath.split('.').reduce((obj, key) => obj?.[key], incomingData)
                : incomingData;

// Sjekk for unik data før transformering:
            if (retrievedData && Array.isArray(retrievedData)) {
                const transformedData: T[] = memoizedDataSource.transform(retrievedData);
                setData(transformedData);
                loadedPath.current = memoizedDataSource.path;
            }
        }
        catch (err) {
            setError(memoizedDataSource.errorMessage);
            console.error('useData loading error:', err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [memoizedDataSource])

    return { data, loading, error };
}