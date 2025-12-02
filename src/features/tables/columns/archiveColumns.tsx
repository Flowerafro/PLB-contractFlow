
import { ColumnDef } from "@tanstack/react-table";

import type { ArchiveDocument } from "@/types/archiveDocument";
import { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

//    -Kolonnetitler for Archive-

export const archiveColumns: ColumnSetup<ArchiveDocument>[] = [
    {
      key: "uploaded",
      header: "Date",
    },
    {
      key: "fileName",
      header: "Filename",
    },
    {
      key: "size",
      header: "Size",
    },
    {
      key: "fullFileName",
      header: "File",
      cell: ({ row, table }) => (
        <button
          className="text-blue-600 underline hover:text-blue-800"
          onClick={(e) => {
            e.stopPropagation(); 
            const record = row.original;
            table.options.meta?.onFileNameClick?.(record);
          }}
        >
          {row.getValue("fullFileName")}
        </button>
      ),
    },
  ];