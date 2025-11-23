"use client";

import React, { 
    useState
} from "react";
import * as XLSX from "xlsx";

// Define the upload result type
interface UploadResult {
  success: boolean;
  fileName?: string;
  url?: string;
  message?: string;
  error?: string;
}

/*
    -------------- Upload felt --------------

    Mislykket forsøk: 
    https://transloadit.com/devtips/implementing-drag-and-drop-file-upload-in-react/


    -Spørsmål med tanke på interfaces-
    Er det nødvendig å akseptere variasjoner i 
    verdiene av disse? Bloat?
*/

// Props for UploadFile komponenten   
interface UploadProps {
    onUploadComplete?: (files: File[], uploadData?: any) => void
    width?: string | number
    height?: string | number
    maxFiles?: number
    maxSize?: number
    acceptedFileTypes?: string[]
    fileTypeLabels?: string
    uploadToR2?: boolean
}

interface XLSXData {
    sheetName: string;
    data: any[];
}

export default function UploadFile({
  onUploadComplete,
  maxSize = 10485760,
  width = '100%',
  height = 'auto',
  acceptedFileTypes = ['.xlsx', '.xls'],
  fileTypeLabels = '.xlsx, .xls'
}: UploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  
  const fileProcesser = async (file: File) => {
    if (file.size > maxSize) {
      setUploadError(`File size exceeds the maximum limit of ${maxSize / 1024 / 1024} MB.`);
      return;
    }

    const fileName = file.name.toLowerCase();
    const isAcceptedType = acceptedFileTypes.some(type => fileName.endsWith(type.toLowerCase()));

    if (!isAcceptedType) {
      setUploadError(`Invalid file type. Please upload one of the following types: ${fileTypeLabels}.`);
      return;
    }

    setIsLoading(true);
    setUploadError(null);
      
    try {
      console.log("Starting upload for file:", file.name, "Size:", file.size, "Type:", file.type);
      
      const uploadResult = await uploadToR2(file);
      console.log("Upload completed:", uploadResult);

      let processedUploadData = null;
      if (acceptedFileTypes.includes('.xlsx') || acceptedFileTypes.includes('.xls')) {  
        console.log("Processing Excel file...");
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        processedUploadData = workbook.SheetNames.map(sheetName => ({
          sheetName,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        }));
        console.log("Excel processing completed. Sheets found:", workbook.SheetNames.length);
      }
      
      if (onUploadComplete) {
        onUploadComplete([file], {
          uploadResult,
          processedUploadData,
          r2Url: uploadResult?.url
        });
      }

      setUploadError(null);
      setFiles([file]); 
      console.log("File uploaded and processed successfully");

    } catch (error) {
      console.error("Error processing file:", error);
      
     
      let errorMessage = "Upload failed. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        if (error.message.includes('Network error')) {
          errorMessage += " Please check your internet connection.";
        }
      }
      
      setUploadError(errorMessage);
    } finally {
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

  // Upload to R2 function
  const uploadToR2 = async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload/', { 
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
      } else if (result?.key) {
        return {
          success: true,
          fileName: result.key.split('/').pop() || file.name,
          url: result.key,
          message: 'File uploaded successfully'
        };
      } else {
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

    
  return (
    <div className="upload-container" style={{ width, height }}>   
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
        className={`
          rounded-lg p-10 text-center cursor-pointer mb-4 transition-all
          outline outline-2 outline-dashed outline-gray-300 outline-offset-[-10px]
          ${isDragOver ? "bg-green-100 border-green-900" : "bg-gray-50 border border-gray-300"}
        `}
        
      >
        {isDragOver ? (
          <p className="text-green-900 text-lg">Drop the Excel file here...</p>
        ) : (
          <div>
          <p className="text-lg mb-2">Drop file here, or click to browse</p>
          <p className="text-sm text-gray-600">
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
          className="hidden"
          />
      </form> 
      {uploadError && <div className="text-red-600 mt-3">{uploadError}</div>}

      {isLoading && (
        <div className="mb-4">
          <p>Loading and converting file, please wait...</p>
        </div>
      )}

      {files.length > 0 && (
         <div className="mt-4">
         <h3 className="font-semibold mb-2">Selected files:</h3>
         <ul className="list-disc ml-5">
           {files.map((file) => (
             <li key={file.name}>
               {file.name} – {(file.size / 1024).toFixed(2)} KB
             </li>
           ))}
         </ul>
       </div>
      )}
    </div>
  );  
}
