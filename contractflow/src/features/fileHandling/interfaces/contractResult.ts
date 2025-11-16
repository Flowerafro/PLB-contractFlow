export type contractServiceResult<T> = {
    success: boolean;
    data?: T;
    error?: {
      code: number;
      message: string;
    };
  };