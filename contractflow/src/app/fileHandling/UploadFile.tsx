"use client";

import React, { 
    useState
} from "react";
import * as XLSX from "xlsx";


/*
    -------------- Upload felt --------------

    Ugangspunkt for deler av løsningene er hentet fra: 
    https://transloadit.com/devtips/implementing-drag-and-drop-file-upload-in-react/


    -Spørsmål med tanke på interfaces-
    Er det nødvendig å akseptere variasjoner i 
    verdiene av disse? Bloat?
*/
   
interface UploadProps {
    onUploadComplete?: (files: File[]) => void
    maxFiles?: number
    maxSize?: number
}
    
interface XLSXData {
    sheetName: string;
    data: any[];
}
    
export default function UploadFile({
  onUploadComplete,
    maxSize = 10485760,
}: UploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonData, setJsonData] = useState<XLSXData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  
  const fileProcesser = async (file: File) => {
    if (file.size > maxSize) {
      setUploadError(`File size exceeds the maximum limit of ${maxSize / 1024 / 1024} MB.`);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
      setUploadError("Invalid file type. Please upload an XLSX or XLS file.");
      return;
    }
  
    setIsLoading(true);
    setUploadError(null);
      
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      
      const sheets: XLSXData[] = workbook.SheetNames.map(sheetName => ({
      sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
      }));
      
      setJsonData(sheets);

      if (onUploadComplete) {
        onUploadComplete([file]);     
      }
    } catch (error) {
      console.error("Error converting XLSX to JSON:", error);
    } finally {
      setIsLoading(false);
    }
  }


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

    
  return (
    <div className="xlsx-converter upload-container">
      <h2>XLSX to JSON Converter</h2>
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
        style={{
          border: isDragOver ? '2px solid #1D391D' : '2px dashed #ccc',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: isDragOver ? '#e0ffe0' : '#f9f9f9',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'all 0.3s ease'
/*
Styling av stiplet linje:
              outline: "1px dashed #1D391D",
              outlineOffset: '-10px',
*/
        }}
      >
        {isDragOver ? (
          <p style={{ color: '#1D391D', fontSize: '18px' }}>Drop the Excel file here...</p>
        ) : (
          <div>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              Drag and drop an Excel file here, or click to browse
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Supports .xlsx and .xls files (max {(maxSize / 1024 / 1024).toFixed(1)}MB)
            </p>
          </div>
        )}
      </div>

      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={isLoading}
        style={{ display: 'none' }}
      />

      {uploadError && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
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
          <h4>Selected files:</h4>
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
