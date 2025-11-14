"use client"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import React from "react"

type Props = {
  data: any[]
}

export default function ExportContractsToExcel({ data }: Props) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("Ingen kontrakter å eksportere")
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(data)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contracts")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })

    saveAs(blob, `contracts_export_${Date.now()}.xlsx`)
  }

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition"
    >
      Eksporter til Excel
    </button>
  )
}
