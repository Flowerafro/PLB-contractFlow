import { RetrievalRepository } from "../interfaces/retrievalRepository";
import { ServiceConfig } from "../interfaces/serviceConfig";
import { RetrievalService } from "../interfaces/retrievalService";

export function createRetrievalService<TSelect, TInsert>(
    repo: RetrievalRepository<TSelect, TInsert>,
    config: ServiceConfig<TInsert>
): RetrievalService<TSelect, TInsert> {
    return {
        async create(data) {
            for (const field of config.requiredFields) {
                if (!data[field] || (typeof data[field] === "string" && data[field].trim() === "")) {
                    return {
                        success: false,
                        error: { code: 400, message: `${String(field)} er påkrevd.` }
                    };
                }
            }
            const result = await repo.create(data);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved oppretting av ${config.entityName}.` }
                };
            }

            return { success: true, data: result.data };
        },

        async list(query = "") {
            const result = await repo.findMany(query);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved listevisning av ${config.entityName}.` }
                };
            }

            return { success: true, data: result.data };
        },

        async get(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: `Ugyldig ${config.entityName}-ID.` }
                };
            }

            const result = await repo.find(id);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved henting av ${config.entityName}.` }
                };
            }

            if (!result.data) {
                return {
                    success: false,
                    error: { code: 404, message: `${config.entityName} ikke funnet.` }
                };
            }

            return { success: true, data: result.data };
        },

        async update(id, patch) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: `Ugyldig ${config.entityName}-ID.` }
                };
            }

            const result = await repo.update(id, patch);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved oppdatering av ${config.entityName}.` }
                };
            }

            return { success: true, data: result.data };
        },

        async delete(id) {
            if (!id || isNaN(id)) {
                return {
                    success: false,
                    error: { code: 400, message: `Ugyldig ${config.entityName}-ID.` }
                };
            }

            const result = await repo.remove(id);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved sletting av ${config.entityName}.` }
                };
            }

            return { success: true, data: result.data };
        },

        async search(query) {
            const result = await repo.findMany(query);

            if (!result.success) {
                return {
                    success: false,
                    error: { code: 500, message: `Databasefeil ved søk i ${config.entityName}.` }
                };
            }

            return {
                success: true,
                data: result.data || []
            };
        }
    };
}