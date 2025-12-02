
import { useMemo } from "react";

export default function useFilteredResults(searchTerm: string, data: any[]) {
    return useMemo(() => {
        if (!searchTerm) return [];

        const cleanSearchTerm = searchTerm.trim().toLowerCase();

        return data.filter((row: any) => (
            String(row.container ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.customer ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.bookingNumber ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.client ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.product ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.principalContractNumber ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.principalContractDate ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.principalOrderNumber ?? "").toLowerCase().includes(cleanSearchTerm) ||
            String(row.principalOrderDate ?? "").toLowerCase().includes(cleanSearchTerm)
        ))
    }, [searchTerm, data]);
}