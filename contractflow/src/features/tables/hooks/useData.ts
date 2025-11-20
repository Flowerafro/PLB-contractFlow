import { 
    useEffect,
    useState,
    useRef,
    useMemo
} from "react";
import type { DataSource } from "@/features/tables/interfaces/dataSource";

/*
    -Optimized code for data transformation from JSON files-

    Improved performance with memoization and reduced re-processing.
    Added caching to prevent redundant data loading and transformation.
*/

export function useData<T>(dataSource: DataSource<T>){
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loadedPath = useRef<string | null>(null);

    // ✅ Memoize dataSource to prevent unnecessary re-loads
    const memoizedDataSource = useMemo(() => dataSource, [
        dataSource.path, 
        dataSource.dataPath, 
        dataSource.errorMessage
    ]);

//  Enhanced data loading with caching:    
    const loadData = async () => { 
        // ✅ Prevent redundant loading of same path
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

            // ✅ Only transform if we have data and it's different from current
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
    }, [memoizedDataSource]) // Only depend on memoized dataSource

    return { data, loading, error };
}