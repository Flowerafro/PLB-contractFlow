import { RetrievalService } from "../interfaces/retrievalService";
import { RetrievalController } from "../interfaces/retrievalController";
import createRetrievalRepository from "../repositories/createRetrievalRepository";
import { createRetrievalService } from "../services/createRetrievalService";
import { RepositoryConfig } from "../interfaces/repositoryConfig";
import { ServiceConfig } from "../interfaces/serviceConfig";
import type { AnyD1Database } from "drizzle-orm/d1";
import { Table } from "drizzle-orm";


export function createRetrievalController<T extends Table>(
    config: RepositoryConfig<T> & ServiceConfig<T['$inferInsert']>,
    env: { DB: AnyD1Database }
): RetrievalController<T['$inferSelect'], T['$inferInsert']> {
    const repoConfig: RepositoryConfig<T> = {
        table: config.table,
        searchFields: config.searchFields,
        idField: config.idField
    };
    const repo = createRetrievalRepository(repoConfig, env);
    const serviceConfig: ServiceConfig<T['$inferInsert']> = {
        requiredFields: config.requiredFields,
        entityName: config.entityName
    };
    const service = createRetrievalService(repo, serviceConfig);
    return {
        async create(ctx) {
            const data: T['$inferInsert'] = await ctx.request.json();
            const result = await service.create(data);

            return new Response(JSON.stringify(result), {
                status: result.success ? 201 : 400,
                headers: { "Content-Type": "application/json" }
            });
        },

        async list(ctx) {
            try {
                const params = new URL(ctx.request.url).searchParams;
                const query = params.get("query") ?? "";
                const result = await service.list(query);

                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                });
            } catch (err) {
                return new Response(JSON.stringify({
                    success: false,
                    error: "Feil ved henting av data."
                }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }
        },

        async get(ctx) {
            const id = Number(ctx.params.id);

            if (isNaN(id)) {
                return new Response(JSON.stringify({
                    success: false,
                    error: "Ugyldig ID."
                }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }

            const result = await service.get(id);

            return new Response(JSON.stringify(result), {
                status: result.success ? 200 : (result.error?.code === 400 ? 404 : 400),
                headers: { "Content-Type": "application/json" }
            });
        },

        async update(ctx) {
            const id = Number(ctx.params.id);
            const body = await ctx.request.json();
            const result = await service.update(id, body);

            return new Response(JSON.stringify(result), {
                status: result.success ? 200 : 400,
                headers: { "Content-Type": "application/json" }
            });
        },

        async delete(ctx) {
            const id = Number(ctx.params.id);
            const result = await service.delete(id);

            return new Response(JSON.stringify(result), {
                status: result.success ? 200 : 400,
                headers: { "Content-Type": "application/json" }
            });
        },

        async search(ctx) {
            const params = new URL(ctx.request.url).searchParams;
            const query = params.get("query") ?? "";
            const result = await service.search(query);

            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }
        
    };
}