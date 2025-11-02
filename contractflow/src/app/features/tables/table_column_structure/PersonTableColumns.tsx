import type { Person } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for personer(brukere)-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Dette arbeidet ble brukt i et eksperiment. Det kan 
    benyttes for brukere på sikt. Men dette er noe vi ikke 
    har snakket om gjennomførelsen av, og
    er av lavere prioritet akkurat nå.
*/

export const PersonTableColumns: ColumnSetup<Person>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
];