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
    <div className="xlsx-converter">
      <h2>XLSX to JSON Converter</h2>
      
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={isLoading}
      />
      
      {isLoading && <p>Converting...</p>}
      
      {fileName && (
        <div>
          <h3>File: {fileName}</h3>
          {jsonData.length > 0 && (
            <>
              <button onClick={downloadJSON}>Download JSON-file</button>
              <h4>Preview:</h4>
              <pre style={{ maxHeight: '300px', overflow: 'auto' }}>
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}