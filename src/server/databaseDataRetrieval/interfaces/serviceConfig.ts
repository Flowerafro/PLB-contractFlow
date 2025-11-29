export interface ServiceConfig<TInsert> {
    requiredFields: (keyof TInsert)[];
    entityName: string;
}; 