import React, { useState} from "react";

import { uploadToR2 } from "@/features/fileHandling/services/uploadToR2";
import { processExcelFile, shouldProcessAsExcel } from "@/features/fileHandling/services/fileProcessing";
import { validateFileSize, validateFileType } from "@/features/fileHandling/utils/validateFile";
import { useDragAndDrop } from "@/features/fileHandling/hooks/useDragAndDrop";

export const useFileUpload = (onUploadComplete: (files: File[], data: any) => void, acceptedFileTypes: string[], fileTypeLabels: string, maxSize: number) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const getFileCategory = (file: File): 'pdf' | 'docx' | 'excel' => {
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.pdf')) return 'pdf';
        if (fileName.endsWith('.docx')) return 'docx';
        if (fileName.endsWith('xlsx') || fileName.endsWith('.xls')) return 'excel';
        return 'pdf';
    };

    const fileProcesser = async (file: File) => {
        const sizeValidation = validateFileSize(file, maxSize);
        if (!sizeValidation.isValid) {
            setUploadError(sizeValidation.error);
            return;
        }

        const typeValidation = validateFileType(file, acceptedFileTypes, fileTypeLabels);
        if (!typeValidation.isValid) {
            setUploadError(typeValidation.error);
            return;
        }

        setIsLoading(true);
        setUploadError(null);

        try {
            const fileCategory = getFileCategory(file);
            console.log(`Processing ${fileCategory} file:`, file.name, "(", file.size, "bytes)");
            const uploadResult = await uploadToR2(file);
            console.log("Upload completed:", uploadResult);
            let processedData = null;

            if (fileCategory === 'excel') {
                processedData = await processExcelFile(file);
            }
            else if (fileCategory === 'pdf') {
            processedData = {
                type: 'pdf',
                message: 'PDF file stored'
            };
            }
            else if (fileCategory === 'docx') {
            processedData = {
                type: 'docx',
                message: 'DOCX file stored'
            };
        }

        if (onUploadComplete) {
            onUploadComplete([file], {
            uploadResult,
            processedData,
            r2Url: uploadResult?.url,
            fileCategory,
            file: file,
            ...(fileCategory === 'pdf' ? { pdfFile: file} : fileCategory === 'docx' ? {docxFile: file} : { excelData: processedData})
        });
        }
    
        setFiles([file]);
        }
        catch (error) {
          console.error("Error during file upload:", error);

          setUploadError(error instanceof Error ? error.message : 'Upload failed');       
        }
        finally {
          setIsLoading(false);
        }
    };
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) fileProcesser(file);
    };

    const handleFileDrop = (droppedFiles: File[]) => {
        if (droppedFiles.length > 0) fileProcesser(droppedFiles[0]);  
    };

    const { isDragOver, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop(handleFileDrop);

    return {
        files,
        isLoading,
        uploadError,
        isDragOver,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileUpload
    };
}