// Props for UploadFile komponenten   
export interface UploadProps {
    onUploadComplete?: (files: File[], uploadData?: any) => void
    width?: string | number
    height?: string | number
    maxFiles?: number
    maxSize?: number
    acceptedFileTypes?: string[]
    fileTypeLabels?: string
    uploadToR2?: boolean
}