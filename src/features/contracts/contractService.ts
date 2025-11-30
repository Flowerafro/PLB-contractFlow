import { createContractRepository } from "./contractRepository";
import type { CreateContractInput } from "../fileHandling/interfaces/createContractInput";
import type { Contract } from "../../types/contract";
import type { Result } from "../../types/results";

export interface ContractService {
    create(data: CreateContractInput): Promise<Result<Contract>>;
    list(query?: string): Promise<Result<Contract[]>>;
    get(id: number): Promise<Result<Contract>>;
    update(id: number, patch: Partial<CreateContractInput>): Promise<Result<{ id: number }>>;
    delete(id: number): Promise<Result<{ id: number }>>;
    search(query: string): Promise<Result<Contract[]>>;
}

export function createContractService(
    repo: ReturnType<typeof createContractRepository>
): ContractService {

    return {

        // Opprett kontrakt
        async create(data) {
            if (!data.plbReference?.trim()) {
                return {
                    success: false,
                    error: { code: 400, message: "plbReference er påkrevd." }
                };
            }

            const result = await repo.create(data);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved oppretting av kontrakt." }
                };
            }

            return { success: true, data: result.data as Contract };
        },

        // List kontrakter (med søk)
        async list(query = "") {
            const result = await repo.findMany(query);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved listevisning." }
                };
            }

            return { success: true, data: result.data as Contract[] };
        },

        // Hent én kontrakt
        async get(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig kontrakt-ID." }
                };
            }

            const result = await repo.find(id);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved henting av kontrakt." }
                };
            }

            if (!result.data) {
                return {
                    success: false,
                    error: { code: 404, message: "Kontrakt ikke funnet." }
                };
            }

            return { success: true, data: result.data as Contract };
        },

        // Oppdater kontrakt
        async update(id, patch) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig kontrakt-ID." }
                };
            }

            const result = await repo.update(id, patch);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved oppdatering." }
                };
            }

            return { success: true, data: result.data };
        },

        // Slett kontrakt
        async delete(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig kontrakt-ID." }
                };
            }

            const result = await repo.remove(id);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved sletting." }
                };
            }

            return { success: true, data: result.data };
        },

        // Søk etter kontrakter
        async search(query) {
            const result = await repo.findMany(query);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved søk." }
                };
            }

            return {
                success: true,
                data: (result.data as Contract[]) ?? []
            };
        }
    };
}

export const contractService = createContractService(createContractRepository());
