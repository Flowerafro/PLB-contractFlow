import type { ArchiveDocument } from "@/app/types/types.ts";
import { ColumnSetup } from "@/features/tables/interfaces/ColumnSetup";

/*
    -Kolonnetitler for bøker-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Arbeid benyttet i eksperiment. Kan slettes eller 
    redigeres.
*/

export const archiveColumns: ColumnSetup<ArchiveDocument>[] = [
    { key: "date", header: "Date" },
    { key: "containerNumber", header: "Container no." },
    { key: "customer", header: "Customer" },
    { key: "documentName", header: "Document" },
];
