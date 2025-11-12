import React, { useState } from "react";

import * as XLSX from "xlsx";

export const processExcelFile = async (
    file: File) => {
        console.log("Processing Excel file...");
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        
        const processedUploadData = workbook.SheetNames.map(sheetName => ({
            sheetName,
            data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        }));

        console.log("Excel processing completed. Sheets found:", workbook.SheetNames.length);
        return processedUploadData;
};

export const shouldProcessAsExcel = (acceptedFileTypes: string[]): boolean => {
    return acceptedFileTypes.includes('.xlsx') || acceptedFileTypes.includes('.xls');
};
