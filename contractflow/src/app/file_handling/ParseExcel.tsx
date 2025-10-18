"use client";

import type { ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { useState } from 'react';

export default function ParseExcel() {

    const [fileName, setFileName] = useState(""); 
    const [columns, setColumns] = useState<string[]>([]);

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

//  Etablerer filnavn for presentasjon i UI:
        setFileName(file.name);

//  Vi setter opp en try-catch block mtp. feil:        
        try{
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
//  Henter det første arket i XLSX-filen
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//  Konverterer XLSX-filen til JSON-format        
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

//  Printer ut data fra jsonData i konsollen        
            console.log(jsonData);
        }
        catch(error){
            console.error("Parsing av excel filen feilet:", error);
        }
    };

    
//   Presenterer et gitt antall linjer i XLSX-filen (Kan brukes for avgrenset data-uthenting)
    const lineSpanOfFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setFileName(file.name);

        try{
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { sheetRows: 6 });

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            console.log(jsonData);
        }
        catch(error){
            console.error("Parsing av excel filen feilet:", error);
        }
    };


//   Adapterer XSLX-data til en ArrayList:
    const fileAsArray = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setFileName(file.name);

        try{
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { sheetRows: 6 });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
            defval: ""
        });

        console.log(jsonData);
        }
        catch(error){
            console.error("Parsing av excel filen feilet:", error);
        }
    };

/*    
    return (

        <>
            <h1>Parse Excel</h1>

            {fileName && (
                <p>
                    File name: <span>{fileName}</span>
                </p>
            )}

            <input type="file" onChange={(e) => fileAs(e)} />
        </>
    );
}
*/

//   Adapterer XSLX-data til en ArrayList:
    const fileDataAsTable = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setFileName(file.name);

        try{
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { sheetRows: 6 });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
            defval: ""
        });

        setColumns(jsonData[0]);
        console.log(jsonData[0])

        console.log(jsonData);
        }
        catch(error){
            console.error("Parsing av excel filen feilet:", error);
        }
    };

    return(
        <article>
            <h1>Parse Excel</h1>
            {fileName && (
                <>
                    <p>
                        File name: <span>{fileName}</span>
                    </p>
                    <p>
                        Columns: {" "}
                        <select>
                        {columns.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                        ))}
                        </select>
                    </p>
                </>
            )}
            <input type="file" accept=".xlsx,.xls" onChange={fileDataAsTable} />
        </article>
    )
}