import { useState } from 'react';
import { 
    SortingState
} from "@tanstack/react-table";

export default function useTableState() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    return {
        sorting,
        setSorting,
        pagination,
        setPagination
    };
}