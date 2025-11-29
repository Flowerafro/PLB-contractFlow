import { RepositoryResult } from "@/server/databaseDataRetrieval/types/repositoryResult";

export interface RetrievalRepository<TSelect, TInsert> {
    create(data: TInsert): Promise<RepositoryResult<TSelect>>;
    findMany(search?: string): Promise<RepositoryResult<TSelect[]>>;
    find(id: number): Promise<RepositoryResult<TSelect>>;
    update(id: number, patch: Partial<TInsert>): Promise<RepositoryResult<{ id: number }>>;
    remove(id: number): Promise<RepositoryResult<{ id: number }>>;
}