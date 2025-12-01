import type { APIError } from "@/types/serverTypes/apiError";

const BASE_URL = "/api/contracts";

async function handleResponse<T>(response: Response): Promise<T> {
    const data = (await response.json().catch(() => null)) as APIError | null;

    if (!response.ok) {
        const message =
            data?.error && typeof data.error === "object"
                ? data.error.message
                : typeof data?.error === "string"
                    ? data.error
                    : "Something obstructed the request.";

        throw new Error(message);
    }
    return data as T;
}

export const contractAPI = {
    async create(data: any) {
        const result = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const body = await handleResponse<{ data: any }>(result);
        return body.data ?? null;
    },

    async list() {
        const result = await fetch(BASE_URL);
        const body = await handleResponse<{ data: any[] }>(result);
        return body.data ?? [];
    },

    async get(id: number) {
        const result = await fetch(`${BASE_URL}/${id}`);
        const body = await handleResponse<{ data: any }>(result);
        return body.data ?? null;
    },

    async update(id: number, patch: any) {
        const result = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch)
        });

        const body = await handleResponse<{ data: { id: number } }>(result);
        return body.data!;
    },

    async delete(id: number) {
        const result = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });

        if (result.ok) {
            return { id };
        }
        await handleResponse(result);
        return null;
    },

    async search(query: string) {
        const result = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
        const body = await handleResponse<{ data: any[] }>(result);
        return body.data ?? [];
    }
};