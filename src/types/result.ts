export type Result<T, E = Error> = {
  success: boolean;
  data?: T;
  error?: {
    code: string | number;
    message: string;
    details?: E;
  };
}