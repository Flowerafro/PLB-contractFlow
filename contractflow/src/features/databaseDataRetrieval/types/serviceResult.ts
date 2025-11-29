export type ServiceResult<T> = {
    success: boolean;
    data?: T
    error?: {
        code: number;
        message: string;
    }
}