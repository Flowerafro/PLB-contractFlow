/*
"use client";

import TableGeneration from "@/features/components/TableGeneration";
import UploadFileToR2 from "@/features/components/UploadFileToR2";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import PdfModal from "@/components/PdfModal";
import { useState } from "react";
import type { ArchiveDocument } from "@/app/types/archiveDocument";
import { archiveColumns } from "@/features/tables/columns/archiveColumns";
import { fetchFromR2 } from "@/features/r2FileFetching/fetchFromR2";
import { useEffect } from "react";

export default function Archive() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [files, setFiles] = useState<ArchiveDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFromR2()
      .then(setFiles)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleOpenPdf(record: any) {
    setSelectedRecord(record);
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
function fetchR2Files() {
  throw new Error("Function not implemented.");
}
*/

"use client";

import TableGeneration from "@/features/components/TableGeneration";
import UploadFile from "@/features/components/UploadFileToR2";
import { hovedlistenDatabaseData } from "@/features/tables/hooks/datatypeStructures/hovedlistenDatabaseData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import PdfModal from "@/components/PdfModal";
import { useState } from "react";

export default function Archive() {
  const { data, loading, error, refetch } = hovedlistenDatabaseData();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  function handleOpenPdf(record: any) {
    setSelectedRecord(record);
  }
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

      {!loading && !error && (
        <div>
          <p>Data loaded successfully. Total records: {data.length}</p>
        </div>
      )}

<TableGeneration
        data={data}
        columnConfig={hovedListenColumns}
        onRowClick={handleOpenPdf} 
      />
   <UploadFile />
   {selectedRecord && (
        <PdfModal
          data={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}
