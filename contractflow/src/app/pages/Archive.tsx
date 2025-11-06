"use client";

import TableGeneration from "@/features/tables/table_presentation/TableGeneration";
import UploadFile from "../../features/file_handling/UploadFile";

import { HovedListenData } from "@/features/tables/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "../../features/tables/table_column_structure/HovedListenColumns";

export default function Archive() {
  const { data: data, loading, error } = HovedListenData();

  return (
    <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">Archive</h1>

        <TableGeneration  data={data} columnConfig={HovedListenColumns}  />
        <UploadFile />
    </div>
  );
}
