export interface Result<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}