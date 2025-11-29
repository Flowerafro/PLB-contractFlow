
import { 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import { ArchiveDocument } from '@/app/types/archiveDocument';
import formatDate from '@/lib/formatDate';

const dateParseCache = new Map<string, Date>();

const parseDate = (dateStr: string): Date => {
    if (dateParseCache.has(dateStr)) {
        return dateParseCache.get(dateStr)!;
    }
    const date = new Date(dateStr);
    dateParseCache.set(dateStr, date);
    return date;
};

const transformArchiveDocument = (item: any): ArchiveDocument => ({
    uploaded: formatDate(parseDate(item.uploaded)) || '',
    fileName: (item.fileName || '').replace(/\.[^/.]+$/, '') || '',
    size: Number(item.size) || 0,
    fullFileName: item.fileName || '',
});

const fetchArchiveData = async (signal?: AbortSignal, page = 1, limit = 10): Promise<{ files: ArchiveDocument[]; total: number }> => {
    const response = await fetch(`/plb-contractflow-r2/?page=${page}&limit=${limit}`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to fetch archive data: ${response.status}`);
    }
    const data: { files: any[]; total: number } = await response.json();
    if (!Array.isArray(data.files)) {
        throw new Error('Unexpected response format');
    }
    return { files: data.files.map(transformArchiveDocument), total: data.total || 0 };
};

export function useArchiveData(page = 1, limit = 10) {
    const [data, setData] = useState<ArchiveDocument[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchArchiveData(signal);
            setData(result.files);
            setTotal(result.total);
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    const refetch = useCallback(() => {
        const abortController = new AbortController();
        fetchData(abortController.signal);
    }, [fetchData]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData(abortController.signal);
        return () => abortController.abort();
    }, [fetchData]);

    return { data, total, loading, error, refetch };
}