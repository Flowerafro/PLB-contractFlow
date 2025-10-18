import type { Person } from "@/app/types/types.ts";
import { ColumnUpset } from "@/app/pages/Interfaces/ColumnSetup";

export const PersonTableColumns: ColumnUpset<Person>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
];