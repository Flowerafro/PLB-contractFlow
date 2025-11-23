import { UploadResult } from "@/features/fileHandling/interfaces/uploadResult";

// -Upload to R2 function-
export const uploadToR2 = async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', { 
            method: 'POST',
            body: formData,
    });

    const result = await response.json() as any;

    if (!response.ok) {
        if (result?.error) {
            throw new Error(result.error);
        }
        throw new Error(`Upload failed: ${response.statusText}`);
    }

    if (result?.success !== undefined) {
        if (!result.success) {
            throw new Error(result.error || 'Upload failed');
        }
        return {
            success: result.success,
            fileName: result.fileName || result.key?.split('/').pop() || file.name,
            url: result.key || result.url,
            message: result.message || 'File uploaded successfully'
        };
    } 
    else if (result?.key) {
        return {
            success: true,
            fileName: result.key.split('/').pop() || file.name,
            url: result.key,
            message: 'File uploaded successfully'
        };
    } 
    else {
        throw new Error('Unexpected response format from server');
    }

    } catch (error) {
        console.error('Upload error:', error);

        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network error: Unable to connect to upload server');
        }

        throw error;
    }
};