// Eksporterer et table (via tableId) til en Excel fil som lastes ned i nettleseren

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportTableToExcel(
  tableId: string,
  fileName: string = "contractflow_data.xlsx"
): void {
  const table = document.getElementById(tableId) as HTMLTableElement | null;

  if (!table) {
    console.error("Table not found:", tableId);
    return;
  }

  const workbook = XLSX.utils.table_to_book(table, {
    sheet: "Sheet1",
  });

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, fileName);
}
