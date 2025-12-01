"use client";

import TableGeneration from "@/features/components/TableGeneration";
import UploadFileToR2 from "@/features/components/UploadFileToR2";
import PdfModal from "@/components/global/PdfModal";
import { useState } from "react";
import { archiveColumns } from "@/features/tables/columns/archiveColumns";
import { useArchiveData } from "@/features/tables/hooks/datatypeStructures/archiveFileData";
// Viser arkivliste med klikkbar filkolonne som åpner PDF-preview i modal.

export default function Archive() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const { data: files, loading, error } = useArchiveData();

  const handleFilenameClick = (record: any) => {
    const url = `/api/generated-pdf?uploaded=${encodeURIComponent(
      record.uploaded
    )}&fileName=${encodeURIComponent(record.fileName)}&fullFileName=${encodeURIComponent(
      record.fullFileName
    )}&size=${encodeURIComponent(record.size)}`;
  
    setSelectedRecord({
      ...record,
      previewUrl: url,
    });
  };
  

  function handleOpenPdf(record: any) {
    handleFilenameClick(record);
  }

  if (loading) return <div>Loading files...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">Archive</h1>

      {loading && (
        <div>
          <p>Loading data...</p>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error }

      <TableGeneration
        data={files}
        columnConfig={archiveColumns}
        onRowClick={handleOpenPdf} 
        meta={{ onFileNameClick: handleFilenameClick }}
        columnWidth="25%"
      />
      <UploadFileToR2 />
      {selectedRecord && (
        <PdfModal
          data={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}