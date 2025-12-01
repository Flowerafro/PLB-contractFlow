import { ServiceResult } from "@/types/serverTypes/serviceResult";

export interface RetrievalService<TSelect, TInsert> {
    create(data: TInsert): Promise<ServiceResult<TSelect>>;
    list(query?: string): Promise<ServiceResult<TSelect[]>>;
    get(id: number): Promise<ServiceResult<TSelect>>;
    update(id: number, patch: Partial<TInsert>): Promise<ServiceResult<{ id: number }>>;
    delete(id: number): Promise<ServiceResult<{ id: number }>>;
    search(query: string): Promise<ServiceResult<TSelect[]>>;
}