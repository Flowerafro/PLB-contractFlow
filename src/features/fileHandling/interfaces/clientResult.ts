

export type ClientServiceResult<T> = {
    success: boolean;
    data?: T;
    error?: {
        code: number;
        message: string;
    }
}