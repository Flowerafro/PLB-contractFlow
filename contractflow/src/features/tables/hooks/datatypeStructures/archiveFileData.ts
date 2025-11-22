
import { useState, useEffect } from 'react';
import { ArchiveDocument } from '@/app/types/archiveDocument';
import formatDate from '@/features/tables/functions/formatDate';

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
    fileName: item.fileName || '',
    size: Number(item.size) || 0,
    uploaded: formatDate(parseDate(item.uploaded)) || '',
    // Add more fields if needed
});

export function useArchiveData() {
    const [data, setData] = useState<ArchiveDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/plb-contractflow-r2")
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch files');
                return res.json();
            })
            .then(raw => {
                if (Array.isArray(raw)) {
                    setData(raw.map(transformArchiveDocument));
                } else {
                    setError('Unexpected response format from server');
                    setData([]);
                }
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}