import { useMemo } from "react";
import { 
    createColumnHelper,
} from "@tanstack/react-table";

import type { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

export default function useTableColumns<T>(columnConfig: ColumnSetup<T>[]) {
    const columnHelper = createColumnHelper<T>();
        
    return useMemo(() => 
        columnConfig.map((config: ColumnSetup<T>) =>
            columnHelper.accessor(config.key as any, {
                id: String(config.key),
                header: () => <span>{config.header}</span>,
                cell: config.cell ? config.cell : info => {
                    const value = info.getValue();
                    return config.formatter ? config.formatter(value) : String(value || "");
                },
                enableSorting: true,
            })
        ), [columnConfig, columnHelper]);
}