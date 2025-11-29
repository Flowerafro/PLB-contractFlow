// - Interface for resultatet av filopplasting -
export interface UploadResult {
  success: boolean;
  fileName?: string;
  url?: string;
  message?: string;
  error?: string;
}
