import { Result } from "@/types/result";

export interface RetrievalRepository<TSelect, TInsert> {
    create(data: TInsert): Promise<Result<TSelect>>;
    findMany(search?: string): Promise<Result<TSelect[]>>;
    find(id: number): Promise<Result<TSelect>>;
    update(id: number, patch: Partial<TInsert>): Promise<Result<{ id: number }>>;
    remove(id: number): Promise<Result<{ id: number }>>;
}