"use client";

import React from "react";

import { UploadProps } from '@/features/fileHandling/interfaces/uploadProps';
import { useFileUpload } from "@/features/fileHandling/hooks/useFileUpload";


// - Upload felt for opplasting til R2 bucket -

export default function UploadFileToR2({
  onUploadComplete,
  maxSize = 10485760,
  width = '20rem',
  height = '15rem',
  acceptedFileTypes = ['.pdf', '.docx', '.xlsx', '.xls'],
  fileTypeLabels = '.pdf, .docx, .xlsx, .xls'
}: UploadProps) {
  const handleUploadComplete = (files: File[], data?: any) => {
    onUploadComplete?.(files, data);
  };

  const {
    files,
    isLoading,
    uploadError,
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileUpload
  } = useFileUpload(handleUploadComplete, acceptedFileTypes, fileTypeLabels, maxSize);

  return (
    <div 
      className={`w-[${width}] h-[${height}]`} 
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
            {files.map((file: File) => (
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
