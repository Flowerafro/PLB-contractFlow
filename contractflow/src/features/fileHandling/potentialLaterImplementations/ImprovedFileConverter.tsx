"use client";

import React, { 
    useState,
    useCallback
} from "react";
import * as XLSX from "xlsx";


/*
    -------------- Upload felt --------------

    Ugangspunkt for deler av løsningene er hentet fra: 
    https://transloadit.com/devtips/implementing-drag-and-drop-file-upload-in-react/
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
    
export default function ImprovedFileConverter({
    onUploadComplete,
    maxFiles = 1,
    maxSize = 10485760,
}: UploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const [jsonData, setJsonData] = useState<XLSXData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setUploadError(`File size exceeds the maximum limit of ${maxSize / 1024 / 1024} MB.`);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
      setUploadError("Invalid file type. Please upload an XLSX or XLS file.");
      return;
    }

    setFileName(file.name);
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
  };


  const downloadJSON = () => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = fileName.replace('.xlsx', '.json');
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

/*  Eksempel på opplastingsfelt:

    const [files, setFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const onDropAccepted = useCallback(( acceptedFiles: File[] ) => {
        setFiles(acceptedFiles)
        setUploadError(null)
        if (onUploadComplete) {
            onUploadComplete(acceptedFiles)
        }
    }, [onUploadComplete]);   

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {   
        const errors = fileRejections.map(
            (rejection) => `${rejection.file.name}: ${rejection.errors[0].message}`
        )
        setUploadError(errors.join("\n"))
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxFiles,
        maxSize,
        accept: {
            ".xlsx": [".xlsx", ".xls"]
        }
    });
    */
    return (
    <div className="xlsx-converter upload-container">

      <h2>XLSX to JSON Converter</h2>
      
      <div>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          disabled={isLoading}
          style={{ 
              display: 'none',
              backgroundColor: '#9e2828ff',
              outline: "1px dashed #1D391D",
              outlineOffset: '-10px',
              borderRadius: 8,
              padding: 16,
              textAlign: "center",
              color: "#1D391D",
              cursor: "pointer",
              backgroundImage: '/upload.png',
  //  Hentet fra: https://www.flaticon.com/free-icons/file-upload 
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
          }}
        />
        <label
          htmlFor="file-upload"
          style={{
            display: 'inline-block',
            backgroundColor: isLoading ? '#9e2828ff': '#1D391D',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',  
            border: 'none',
            fontSize: '16px',
            transition: 'background-color 0.3s',

          }}
        >
          {isLoading ? 'Processing...' : 'Choose Excel File'}
        </label>
      </div>

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

      {fileName && jsonData.length > 0 && (
        <div>
          <h3>File: {fileName}</h3>
          {jsonData.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h3>File: {fileName}</h3>
              
              <button onClick={downloadJSON} style={{ backgroundColor: 'red' }}>
                Download JSON-file
              </button>
             
              <details>
                <summary style={{ cursor: 'pointer', marginTop: '16px'  }}>
                  Show preview ({jsonData.reduce((total, sheet) => total + sheet.data.length, 0)} rows)
                </summary>
             
                <pre style={{ 
                  maxHeight: '400px', 
                  overflowY: 'auto', 
                  backgroundColor: '#f4f4f4', 
                  padding: '16px', 
                  borderRadius: '8px'   
                }}>
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}
      </div>
    );
{/*
        <div 
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Slipp filene her ...</p>
            ) : (
                <p>Dra og slipp noen XLSX-filer her, eller klikk for å velge filer</p>
            )}
        </div>

        {uploadError && 
            <div className="error-message">
                <p>{uploadError}</p>
            </div>
        }

        {files.length > 0 && (
            <div className='uploaded-files'>
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
    */}
}
