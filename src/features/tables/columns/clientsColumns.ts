import type { Client } from "@/types/client";
import { ColumnSetup } from "@/features/tables/interfaces/columnSetup";

/*
    -Column definitions for clients table-
    Left side shows the key value in the data object
    Right side shows the name presented in the table 

*/

export const clientsColumns: ColumnSetup<Client>[] = [
    { key: "id", header: "Client ID" },
    { key: "name", header: "Company Name" },
    { key: "customerCode", header: "Customer Code" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "country", header: "Country" },
    { key: "status", header: "Status" },
    { key: "createdAt", header: "Created" }
];