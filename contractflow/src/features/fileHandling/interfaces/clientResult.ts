

export type clientServiceResult<T> = {
    success: boolean;
    data?: T;
    error?: {
        code: number;
        message: string;
    }
}