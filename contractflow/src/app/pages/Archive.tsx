"use client";

import TableGeneration from "@/features/tables/component/TableGeneration";
import UploadFile from "@/features/fileHandling/component/UploadFileToR2";
import { hovedlistenDatabaseData } from "@/features/tables/hooks/datatypeStructures/hovedlistenDatabaseData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";


export default function Archive() {
  const { data, loading, error, refetch } = hovedlistenDatabaseData();

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

      <TableGeneration  data={data} columnConfig={hovedListenColumns}  />
      <UploadFile />
    </div>
  );
}
