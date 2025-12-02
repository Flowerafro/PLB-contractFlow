import { Result } from "@/types/result";
import type { APIError } from "@/types/serverTypes/apiError";
import type { CreateClientInput } from "@/features/fileHandling/interfaces/createClientInput";
import type { DBClient } from "@/db/schema/schema";

async function handleResponse<T>(response: Response): Promise<Result<T>> {
    const data = (await response.json().catch(() => null)) as APIError | null;
    if (!response.ok) {
        const message =
            data?.error && typeof data.error === "object"
                ? data.error.message
                : typeof data?.error === "string"
                    ? data.error
                    : "An error occurred.";

        return {
            success: false,
            error: {
                code: response.status,
                message: message || "An error occurred."
            }
        };
    }
    return data as Result<T>;
}

interface APIConfig<TCreate, TUpdate, TEntity> {
    baseUrl: string;
    createPayload?: TCreate;
    updatePayload?: TUpdate;
    entity?: TEntity;
}

export function createAPIClient<TCreate, TUpdate, TEntity>(config: APIConfig<TCreate, TUpdate, TEntity>) {
    const { baseUrl } = config;
    return {
        async list(query?: string): Promise<Result<TEntity[]>> {
            const url = query ? `${baseUrl}?search=${encodeURIComponent(query)}` : baseUrl;
            const result = await fetch(url);
            return await handleResponse<TEntity[]>(result);
        },

        async search(query: string): Promise<Result<TEntity[]>> {
            const url = `${baseUrl}/search?query=${encodeURIComponent(query)}`;
            const result = await fetch(url);
            return await handleResponse<TEntity[]>(result);
        },

        async get(id: number): Promise<Result<TEntity>> {
            const result = await fetch(`${baseUrl}/${id}`);
            return await handleResponse<TEntity>(result);
        },

        async create(data: TCreate): Promise<Result<TEntity>> {
            const result = await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            return await handleResponse<TEntity>(result);
        },

        async update(id: number, patch: TUpdate): Promise<Result<{ id: number }>> {
            const result = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch)
            });

            return await handleResponse<{ id: number }>(result);
        },

        async delete(id: number): Promise<Result<{ id: number }>> {
            const result = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE"
            });

            return await handleResponse<{ id: number }>(result);
        }
    };
}

export const apiRegistry = {
    clients: createAPIClient<CreateClientInput, Partial<CreateClientInput>, DBClient>({
        baseUrl: "/api/clients",
    }),
    contracts: createAPIClient<any, any, any>({
        baseUrl: "/api/contracts",
    }),
} as const;

export const clientAPI = apiRegistry.clients;
export const contractAPI = apiRegistry.contracts;