"use client";

import React, { 
    useState,
    useEffect,
    useCallback
} from "react";
import * as XLSX from "xlsx";
import { 
    useDropzone,
    FileRejection
} from "react-dropzone";

/*
    -------------- Upload felt --------------

    Her er det meste en ferdig løsning fra: 
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
    
export default function UploadFile(){
  const [fileName, setFileName] = useState<string>("");
  const [jsonData, setJsonData] = useState<XLSXData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      
      const sheets: XLSXData[] = workbook.SheetNames.map(sheetName => ({
        sheetName,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
      }));

      setJsonData(sheets);
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
      
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={isLoading}
        style={{ 
            display: 'none',
            backgroundColor: '#ddddddff',
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
      
      {isLoading && <p>Converting...</p>}
      
      {fileName && (
        <div>
          <h3>File: {fileName}</h3>
          {jsonData.length > 0 && (
            <>
              <button onClick={downloadJSON} style={{ backgroundColor: 'red' }}>Download JSON-file</button>
              <h4>Preview:</h4>
              <pre>
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
      </div>);
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
