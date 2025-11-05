import type { Clients } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

/*
    -Kolonnetitler for kontakt-info-
    Venstre side viser key-verdien i dataobjektet
    Høyre side viser navnet som presenteres i tabellen 

    Ikke påbegynt.

    Slik jeg har tenkt det, vil dette referere til person-
    data i databsen. Det er ikke sikkert det er noen vits
    i å ha to tabeller for dette
*/

export const ClientsColumns: ColumnSetup<Clients>[] = [
    { key: "clientNumber", header: "Client no." },
    { key: "customer", header: "Customer" },
    { key: "contactPerson", header: "Contact Person" },
    { key: "email", header: "E-mail" },
    { key: "phoneNumber", header: "Phone no." },
    { key: "country", header: "Country" }
];