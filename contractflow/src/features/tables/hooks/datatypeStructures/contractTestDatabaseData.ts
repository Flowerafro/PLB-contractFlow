import { useEffect, useState } from 'react';
import { ContractTest } from "../../../../app/types/contractTest";

/*
    -Hook for fetching contract data from database-
    
    This hook manages the data fetching for contracts table
    with proper error handling and loading states using API calls.
*/

export function contractTestDatabaseData() {
    const [data, setData] = useState<ContractTest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('/api/v1/contractTest');
                const result = await response.json() as { success: boolean; data?: ContractTest[]; error?: string };
                
                if (!response.ok || !result.success) {
                    throw new Error(result.error || 'Failed to fetch contract data');
                }
                
                setData(result.data || []);
            } catch (err) {
                console.error('Error fetching contract test data:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setData([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}