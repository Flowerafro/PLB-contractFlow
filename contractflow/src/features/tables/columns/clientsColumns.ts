<<<<<<<< HEAD:contractflow/src/features/tables/table_column_structure/ClientsColumns.tsx
import type { Clients } from "@/types/types";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";
========
import type { Clients } from "@/app/types/types.ts";
import { columnSetup } from "@/features/tables/interfaces/columnSetup";
>>>>>>>> develop-cleanup:contractflow/src/features/tables/columns/clientsColumns.ts

/*
    -Kolonnetitler for kontakt-info-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Ikke påbegynt.

    Slik jeg har tenkt det, vil dette referere til person-
    data i databsen. Det er ikke sikkert det er noen vits
    i å ha to tabeller for dette
*/

export const clientsColumns: columnSetup<Clients>[] = [
    { key: "clientNumber", header: "Client no." },
    { key: "customer", header: "Customer" },
    { key: "contactPerson", header: "Contact Person" },
    { key: "email", header: "E-mail" },
    { key: "phoneNumber", header: "Phone no." },
    { key: "country", header: "Country" }
];