export type APIError = {
    error?: string | { message?: string };
    data?: unknown;
}