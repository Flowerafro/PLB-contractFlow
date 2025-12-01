"use client";

import { exportTableToExcel } from "@/features/tables/exportTableToExcel";

export default function ExportExcelButton() {
  return (
    <button
      onClick={() => exportTableToExcel("contracts-table")}
      className="
        fixed right-10 bottom-10
        bg-green-900 hover:bg-green-800
        text-white rounded-xl 
        px-5 py-4
        flex flex-col items-center
        transition-all duration-200
        shadow-lg
      "
    >
      <span className="text-sm mt-1">Export to Excel</span>
    </button>
  );
}