import { RetrievalService } from "./retrievalService";

export interface RetrievalController<TSelect, TInsert> {
    create(ctx: any): Promise<Response>;
    list(ctx: any): Promise<Response>;
    get(ctx: any): Promise<Response>;
    update(ctx: any): Promise<Response>;
    delete(ctx: any): Promise<Response>;
    search(ctx: any): Promise<Response>;
    
}