// midlertidig api-kall for klienthåndtering før database er på plass. ikke i bruk siden vi måtte gå tilbake til mock-data

import type { Client } from "../types/client";
import { ClientSearchItem } from "../types/clientSearch";
import { Result } from "@/types/results";
import type { CreateClientInput } from "../features/fileHandling/interfaces/createClientInput";

const BASE_URL = "/api/clients";

type ApiError = {
    error?: string | { message?: string };
    data?: unknown;
}

async function handleResponse<T>(response: Response): Promise<Result<T>> {
    const data = (await response.json().catch(() => null)) as ApiError | null;

    if (!response.ok) {
        const message =
            data?.error && typeof data.error === "object"
                ? data.error.message
                : typeof data?.error === "string"
                    ? data.error
                    : "Noe gikk galt med forespørselen.";

        return {
            success: false,
            error: {
                code: response.status,
                message: message || "Noe gikk galt med forespørselen."
            }
        };
    }

    return { 
        success: true, 
        data: data as T
    };
};

export const clientAPI = {
    async list(query?: string): Promise<Result<Client[]>> {
        const url = query ? `${BASE_URL}?search=${encodeURIComponent(query)}` : BASE_URL;
        const result = await fetch(url);
        return await handleResponse<Client[]>(result);
    },

    async search(query: string): Promise<Result<ClientSearchItem[]>> {
        const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
        const result = await fetch(url);
        return await handleResponse<ClientSearchItem[]>(result);
    },

    async get(id: number): Promise<Result<Client>> {
        const result = await fetch(`${BASE_URL}/${id}`);
        return await handleResponse<Client>(result);
    },

    async create(data: CreateClientInput): Promise<Result<Client>> {
        const result = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await handleResponse<Client>(result);
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