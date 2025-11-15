import { createClientRepository } from "./clientRepository";
import type { clientServiceResult } from "../fileHandling/interfaces/clientResult";
import type { CreateClientInput } from "../fileHandling/interfaces/createClientInput";
import type { Client } from "@/app/types/client";
import type { ClientSearchItem } from "@/app/types/clientSearch";

export interface ClientService {
    create(data: CreateClientInput): Promise<clientServiceResult<Client>>;
    list(query?: string): Promise<clientServiceResult<Client[]>>;
    get(id: number): Promise<clientServiceResult<Client>>;
    update(id: number, patch: Partial<CreateClientInput>): Promise<clientServiceResult<{ id: number }>>;
    delete(id: number): Promise<clientServiceResult<{ id: number }>>;
    search(query: string): Promise<clientServiceResult<Client[]>>;
}

export function createClientService(
    repo: ReturnType<typeof createClientRepository>
): ClientService {

    return {

        async create(data) {
            if (!data.name?.trim()) {
                return {
                    success: false,
                    error: { code: 400, message: "Klientnavn er påkrevd." }
                };
            }

            const result = await repo.create(data);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved oppretting." }
                };
            }

            return { success: true, data: result.data };
        },

        async list(query = "") {
            const result = await repo.findMany(query);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved listevisning." }
                };
            }

            return { success: true, data: result.data };
        },

        async get(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig klient-ID." }
                };
            }

            const result = await repo.find(id);

            if ("error" in result) {
                return {
                    success: false,
                    error: { code: 500, message: "Databasefeil ved henting." }
                };
            }

            if (!result.data) {
                return {
                    success: false,
                    error: { code: 404, message: "Klient ikke funnet." }
                };
            }

            return { success: true, data: result.data };
        },

        async update(id, patch) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig klient-ID." }
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

        async delete(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: "Ugyldig klient-ID." }
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
                data: result.data || []
            }
        }
    };
}

export const clientService = createClientService(createClientRepository());
