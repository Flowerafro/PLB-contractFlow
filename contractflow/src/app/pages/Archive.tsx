"use client";

import Layout from "@/app/pages/Layout";
import TableGeneration from "@/app/features/tables/table_presentation/TableGeneration";
import UploadFile from "../features/fileHandling/UploadFile";

import { HovedListenData } from "@/app/features/tables/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "../features/tables/table_column_structure/HovedListenColumns";

export default function Archive() {
  const { data: data, loading, error } = HovedListenData();

  return (
    <Layout>
        <h1 className="text-3xl font-bold text-green-500 p-6 bg-gray-100 rounded-lg">
          Archive
        </h1>
        <TableGeneration  data={data} columnConfig={HovedListenColumns}  />
        <UploadFile />
    </Layout>
  );
}
