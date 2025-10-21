import type { Person } from "@/app/types/types.ts";
import { ColumnSetup } from "@/app/interfaces/ColumnSetup";

export const PersonTableColumns: ColumnSetup<Person>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
];