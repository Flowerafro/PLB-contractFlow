"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

/*
    -------------- XLSX til JSON Konvertør --------------

    Denne komponenten er i stor grad avskrift fra dokumentasjon. Kun ment 
    for konvertering av filer i arbeidsprosessen og for å se håndtering
    av fil-konvertering.
*/

interface XLSXData {
  sheetName: string;
  data: any[];
}

export default function XLSXToJSONConverter() {
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">XLSX to JSON Converter</h2>
      
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="block mb-4"
      />
      
      {isLoading && <p>Converting...</p>}
      
      {fileName && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">File: {fileName}</h3>
          {jsonData.length > 0 && (
            <>
              <button
                onClick={downloadJSON}
                className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
              >
                Download JSON-file
              </button>             
              <h4 className="font-semibold mb-2">Preview:</h4>

              <pre className="max-h-[300px] overflow-auto bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}