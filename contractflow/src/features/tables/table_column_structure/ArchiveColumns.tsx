import type { ArchiveDocument } from "@/types/types";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for bøker-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Arbeid benyttet i eksperiment. Kan slettes eller 
    redigeres.
*/

export const ArchiveColumns: ColumnSetup<ArchiveDocument>[] = [
    { key: "date", header: "Date" },
    { key: "containerNumber", header: "Container no." },
    { key: "customer", header: "Customer" },
    { key: "documentName", header: "Document" },
];
