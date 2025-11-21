"use client";

import React, { 
    useState
} from "react";

import { UploadProps } from '@/features/fileHandling/interfaces/uploadProps';
import { processExcelFile, shouldProcessAsExcel } from "@/features/fileHandling/services/fileProcessingService";
import { validateFileSize, validateFileType } from "@/features/fileHandling/utils/validateFile";
import { useDragAndDrop } from "@/features/fileHandling/hooks/useDragAndDrop";
import { on } from "events";

// - Upload felt for opplasting til R2 bucket -

async function uploadFileToBackend(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/upload/', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return response.json()
}

export default function UploadFileToLocalStorage({
  onUploadComplete,
  maxSize = 10485760,
  width = '100%',
  height = 'auto',
  acceptedFileTypes = ['.pdf', '.xlsx', '.xls'],
  fileTypeLabels = '.xlsx, .xls, .pdf' ,
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

  
  const getFileCategory = (file: File): 'pdf' | 'excel' => {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.pdf')) return 'pdf';
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
      
      const localFileData = {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        localUrl: URL.createObjectURL(file),
        category: fileCategory
      }

      try {
        const backendResult = await uploadFileToBackend(file);
        console.log('Backend upload result: ', backendResult);
      }
      catch (err) {
        setUploadError('File upload failed')
        setIsLoading(false);
        return;
      }

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

      const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        category: fileCategory,
        lastModified: file.lastModified,
        uploadDate: new Date().toISOString(),
      };
      storedFiles.push(fileInfo);
      localStorage.setItem('uploadedFiles', JSON.stringify(storedFiles));

      if (onUploadComplete) {
        onUploadComplete([file], {
          localFileData,
          localUrl: localFileData.localUrl,
          fileCategory,
          file: file,
          ...(fileCategory === 'pdf' ? { pdfFile: file} : { excelData: processedData})
        });
      }

      setFiles([file]);
      console.log(`${fileCategory.toUpperCase()} file stored locally`);
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
    <div className="upload-container" style={{ width, height }}>   
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
        style={{
          border: isDragOver ? '2px solid #1D391D' : '2px #ccc',
          borderRadius: '10px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: isDragOver ? '#e0ffe0' : '#f9f9f9',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'all 0.3s ease',
          outline: "2px dashed #cacacaff",
          outlineOffset: '-10px',
        }}
      >
        {isDragOver ? (
          <p style={{ color: '#1D391D', fontSize: '18px' }}>Drop the Excel file here...</p>
        ) : (
          <div>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              Drop file here, or click to browse
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
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
        <div 
          className="error-message" 
          style={{ 
            color: 'red', 
            marginTop: '10px' 
          }}>
          {uploadError}
        </div>
      )}

      {isLoading && (
        <div style={{ marginBottom: '16px' }}>
          <p>Loading and converting file, please wait...</p>
        </div>
      )}

      {files.length > 0 && (
        <div className='uploaded-files' style={{ marginTop: '16px' }}>
          <h3>Selected files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}
