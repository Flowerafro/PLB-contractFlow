"use client";

import React, { 
    useState
} from "react";

import { UploadProps } from '@/features/fileHandling/interfaces/uploadProps';
import { uploadToR2 } from "@/features/fileHandling/services/uploadToR2";
import { processExcelFile, shouldProcessAsExcel } from "@/features/fileHandling/services/fileProcessingService";
import { validateFileSize, validateFileType } from "@/features/fileHandling/utils/validateFile";
import { useDragAndDrop } from "@/features/fileHandling/hooks/useDragAndDrop";

// - Upload felt for opplasting til R2 bucket -

export default function UploadFileToR2({
  onUploadComplete,
  maxSize = 10485760,
  width = '20rem',
  height = '15rem',
  acceptedFileTypes = ['.pdf', '.docx', '.xlsx', '.xls'],
  fileTypeLabels = '.pdf, .docx, .xlsx, .xls'
}: UploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Use the custom drag and drop hook
  const handleFileDrop = async (droppedFiles: File[]) => {
    if (droppedFiles.length > 0) {
      await fileProcesser(droppedFiles[0]);
    }
  };

  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop(handleFileDrop);
  
    const getFileCategory = (file: File): 'pdf' | 'docx' | 'excel' => {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.pdf')) return 'pdf';
    if (fileName.endsWith('.docx')) return 'docx';
    if (fileName.endsWith('xlsx') || fileName.endsWith('.xls')) return 'excel';
    return 'pdf';
  }

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

      if (fileCategory === 'excel' && shouldProcessAsExcel(acceptedFileTypes)) {
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
    console.log("File uploaded successfully.");
    }
    catch (error: any) {
      console.error("Error during file upload:", error);

      let errorMessage = 'An unexpected error occurred during file upload.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setUploadError(errorMessage);       
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await fileProcesser(file);
  };

  return (
    <div 
      className={`w-[${width}] h-[${height}]`} 
//      style={{ width: "30rem", height: "20rem" }}
    >   
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
        className={`
          max-w-xs
          max-h-xs
          border-2
          border-solid
          rounded-lg
          p-10
          text-center
          cursor-pointer
          mb-4
          transition-colors
          duration-300
          ${isDragOver 
            ? 'border-green-800 bg-green-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
            style={{
              outline: "2px dashed #cacacaff",
              outlineOffset: '-10px',
            }}
      >
        {isDragOver ? (
          <p className="text-green-800 text-lg">
            Drop file here...
          </p>
        ) : (
          <div>
            <p className="text-lg mb-2">
              Drop file here, or click to browse
            </p>
            <p className="text-sm text-gray-600">
              {fileTypeLabels} (max {(maxSize / 1024 / 1024).toFixed(1)}MB)
            </p>
          </div>
        )}
      </div>
      <input
        id="file-upload"
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileUpload}
        disabled={isLoading}
        style={{ display: 'none' }}
      /> 
      {uploadError && (
        <div className="text-red-500 mt-2">
          {uploadError}
        </div>
      )}

      {isLoading && (
        <div className="mb-4">
          <p>Loading and converting file, please wait...</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Selected files:</h3>
          <ul className="list-disc list-inside">
            {files.map((file) => (
              <li key={file.name} className="text-sm">
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}
