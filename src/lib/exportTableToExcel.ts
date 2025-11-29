import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// Denne funksjonen eksporterer en HTML tabell til en Excel fil (.xlsx)
export function exportTableToExcel(
  tableId: string,
  fileName: string = "contractflow_data.xlsx"
): void {
  const table = document.getElementById(tableId);

  if (!(table instanceof HTMLTableElement)) {
    console.error(`exportTableToExcel: No <table> found with id "${tableId}"`);
    return;
  }
  // Gjør tabellen om til et Excel ark
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, fileName);
}
