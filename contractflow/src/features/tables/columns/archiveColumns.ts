
import type { ArchiveDocument } from "@/app/types/archiveDocument";
import { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

//    -Kolonnetitler for Archive-

export const archiveColumns: ColumnSetup<ArchiveDocument>[] = [
    { key: "uploaded", header: "Date" },
    { key: "fileName", header: "Filename" },
    { key: "size", header: "Size" },
    {key: "fullFileName", header: "Fil" },
];