import { Table } from "drizzle-orm";

export interface RepositoryConfig<T extends Table> {
    table: T;
    searchFields: (keyof T['$inferSelect'])[];
    idField: keyof T['$inferSelect'];
}