import {
    useState,
    useEffect,
    useCallback
} from "react";

export interface databaseHookResult<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export default function useDatabase<T>(
    queryFunction: () => Promise<T[]>,
    dependencies: any[] = []
): databaseHookResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching data...');
            const result = await queryFunction();
            setData(result);
            console.log('Data load successful:', result.length, 'records');
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Database query failed';
            setError(errorMessage);
            console.error('Error during data fetch:', errorMessage);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    }
}