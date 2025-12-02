import { Result } from "@/types/result";

export interface RetrievalService<TSelect, TInsert> {
    create(data: TInsert): Promise<Result<TSelect>>;
    list(query?: string): Promise<Result<TSelect[]>>;
    get(id: number): Promise<Result<TSelect>>;
    update(id: number, patch: Partial<TInsert>): Promise<Result<{ id: number }>>;
    delete(id: number): Promise<Result<{ id: number }>>;
    search(query: string): Promise<Result<TSelect[]>>;
}