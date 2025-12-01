import type { DBClient } from "@/db/schema/schema";
import { ClientSearchItem } from "@/types/clientSearch";
import { Result } from "@/types/results";
import type { CreateClientInput } from "@/features/fileHandling/interfaces/createClientInput";
import type { APIError } from "@/types/serverTypes/apiError";

const BASE_URL = "/api/clients";



async function handleResponse<T>(response: Response): Promise<Result<T>> {
    const data = (await response.json().catch(() => null)) as APIError | null;
    console.log('API Response status:', response.status);
    console.log('API Response data:', data);
    console.log('API Response data type:', typeof data);
    if (data && typeof data === 'object') {
        console.log('API Response data.success:', (data as any).success);
        console.log('API Response data.data:', (data as any).data);
        console.log('API Response data.data type:', typeof (data as any).data);
        console.log('API Response data.data isArray:', Array.isArray((data as any).data));
    }

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
};

export const clientAPI = {
    async list(query?: string): Promise<Result<DBClient[]>> {
        const url = query ? `${BASE_URL}?search=${encodeURIComponent(query)}` : BASE_URL;
        const result = await fetch(url);
        return await handleResponse<DBClient[]>(result);
    },

    async search(query: string): Promise<Result<DBClient[]>> {
        const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
        const result = await fetch(url);
        return await handleResponse<DBClient[]>(result);
    },

    async get(id: number): Promise<Result<DBClient>> {
        const result = await fetch(`${BASE_URL}/${id}`);
        return await handleResponse<DBClient>(result);
    },

    async create(data: CreateClientInput): Promise<Result<DBClient>> {
        const result = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await handleResponse<DBClient>(result);
    },

    async update(id: number, patch: Partial<CreateClientInput>): Promise<Result<{ id: number }>> {
        const result = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch)
        });

        return await handleResponse<{ id: number }>(result);
    }
}