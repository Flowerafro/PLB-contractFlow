
import { ColumnDef } from "@tanstack/react-table";

import type { ArchiveDocument } from "@/app/types/archiveDocument";
import { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

//    -Kolonnetitler for Archive-

export const archiveColumns: ColumnSetup<ArchiveDocument>[] = [
    { key: "uploaded", header: "Date" },
    { key: "fileName", header: "Filename" },
    { key: "size", header: "Size" },
    { key: "fullFileName", 
      header: "File",
      cell: ({ row, table }) => (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    const record = row.original;
                    table.options.meta?.onFileNameClick?.(record);
                }}
                className="text-blue-500 underline hover:text-blue-700"
                >
                {row.getValue("fullFileName")}
            </button>
        ),
    },
];