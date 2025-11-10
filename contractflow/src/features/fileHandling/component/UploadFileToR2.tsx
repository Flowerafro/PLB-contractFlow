"use client";

import React, { 
    useState
} from "react";

import { uploadProps } from '../interfaces/uploadProps';
import { uploadToR2 } from "../services/uploadToR2";
import { processExcelFile, shouldProcessAsExcel } from "../services/fileProcessingService";
import { validateFileSize, validateFileType } from "../utils/validateFile";

// - Upload felt for opplasting til R2 bucket -

export default function UploadFileToR2({
  onUploadComplete,
  maxSize = 10485760,
  width = '100%',
  height = 'auto',
  acceptedFileTypes = ['.xlsx', '.xls'],
  fileTypeLabels = '.xlsx, .xls'
}: uploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
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
      console.log("Processing file:", file.name, "(", file.size, "bytes )");
      
      const uploadResult = await uploadToR2(file);
      console.log("Upload completed:", uploadResult);

      let processedData = null;
      if (shouldProcessAsExcel(acceptedFileTypes)) {
          processedData = await processExcelFile(file);
      }

      if (onUploadComplete) {
        onUploadComplete([file], {
          uploadResult,
          processedData,
          r2Url: uploadResult?.url,
        });
    }

    setUploadError(null);
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
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setFiles(files);
      await fileProcesser(files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.namedItem("file") as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    const res = await fetch("/upload", { method: "POST", body: formData });
    const data = await res.json();
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
      <form onSubmit={handleUpload}>
        <input
          id="file-upload"
          type="file"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileUpload}
          disabled={isLoading}
          style={{ display: 'none' }}
        />
      </form> 
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
