// midlertidig api-kall for klienthåndtering før database er på plass

import type { Client } from "../app/types/client";
import { ClientSearchItem } from "../app/types/clientSearch";
import { clientServiceResult } from "../features/fileHandling/interfaces/clientResult";
import type { CreateClientInput } from "../features/fileHandling/interfaces/createClientInput";

const BASE_URL = "/api/clients";

type ApiError = {
    error?: string | { message?: string };
    data?: unknown;
}

async function handleResponse<T>(response: Response): Promise<T> {
    const data = (await response.json().catch(() => null)) as ApiError | null;

    if (!response.ok) {
        const message =
            data?.error && typeof data.error === "object"
                ? data.error.message
                : typeof data?.error === "string"
                    ? data.error
                    : "Noe gikk galt med forespørselen.";

        throw new Error(message);
    }

    return data as T;
}

export const clientAPI = {
    async list(query?: string): Promise<Client[]> {
        const url = query ? `${BASE_URL}?search=${encodeURIComponent(query)}` : BASE_URL;
        const result = await fetch(url);
        const body = await handleResponse<clientServiceResult<Client[]>>(result);

        return body.data ?? [];
    },

    async search(query: string): Promise<ClientSearchItem[]> {
        const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
        const result = await fetch(url);
        const body = await handleResponse<clientServiceResult<ClientSearchItem[]>>(result);

        return body.data ?? [];
    },

    async get(id: number): Promise<Client | null> {
        const result = await fetch(`${BASE_URL}/${id}`);
        const body = await handleResponse<clientServiceResult<Client>>(result);
        return body.data ?? null;
    },

    async create(data: CreateClientInput): Promise<Client> {
        const result = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const body = await handleResponse<clientServiceResult<Client>>(result);

        if (!body.data) throw new Error("Feil i opprettelse av klient.");
        return body.data;
    },

    async update(id: number, patch: Partial<CreateClientInput>): Promise<{ id: number }> {
        const result = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch)
        });

        const body = await handleResponse<clientServiceResult<{ id: number }>>(result);
        return body.data!;
    }

}