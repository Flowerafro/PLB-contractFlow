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
      <div className="xlsx-converter upload-container p-4">

      <h2 className="text-xl font-bold mb-4">XLSX to JSON Converter</h2>
      
      <div>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="
          hidden
          bg-[#9e2828]
          outline outline-1 outline-dashed outline-[#1D391D]
          outline-offset-[-10px]
          rounded-lg
          p-4
          text-center
          text-[#1D391D]
          cursor-pointer
          bg-no-repeat bg-center bg-contain
          bg-[url('/upload.png')]
        "
      />

      <label
        htmlFor="file-upload"
        className={`
          inline-block
          text-white
          px-6 py-3
          rounded-lg
          text-[16px]
          transition-colors duration-300
          ${isLoading ? "bg-[#9e2828] cursor-not-allowed" : "bg-[#1D391D] cursor-pointer"}
        `}
      >
        {isLoading ? "Processing..." : "Choose Excel File"}
      </label>

      </div>

      {uploadError && (
        <div className="error-message text-red-600 mt-3">
          {uploadError}
        </div>
      )}

      {isLoading && (
        <div className="mb-4">
          <p>Loading and converting file, please wait...</p>
        </div>
      )}

      {fileName && jsonData.length > 0 && (
        <div>
          <h3>File: {fileName}</h3>
          {jsonData.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">File: {fileName}</h3>
              
          <button
            onClick={downloadJSON}
            className="px-4 py-2 bg-red-600 text-white rounded mb-4"
          >
            Download JSON-file
          </button>
             
          <details className="mt-4">
            <summary className="cursor-pointer">
              Show preview (
              {jsonData.reduce(
                (total, sheet) => total + sheet.data.length,
                0
              )}{" "}
              rows)
            </summary>
             
            <pre className="max-h-[400px] overflow-y-auto bg-gray-100 p-4 rounded mt-3 text-sm">

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
