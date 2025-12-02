import { TableGenerationProps } from "./tableGenerationProps";

export interface TabbedTableProps<T> extends TableGenerationProps<T> {
    groupByColumn: keyof T;
    tabLabels?: Record<string, string>;
    defaultTab?: string;
}