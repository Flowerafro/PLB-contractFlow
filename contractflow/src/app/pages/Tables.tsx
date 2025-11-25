"use client";

import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import TabbedTableGeneration from "@/components/featureComponents/TabbedTableGeneration";
import { hovedlistenDatabaseData } from "@/features/tables/hooks/datatypeStructures/hovedlistenDatabaseData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import { exportTableToExcel } from "@/lib/exportTableToExcel";
import ExportExcelButton from "@/components/ExportExcelButton"
import useFilteredResults from "../hooks/useFilteredResults";
import mapShipmentData from "@/lib/mapShipmentData";

//  -Tables-siden
//  Her er dashboard siden lagt over slik at den kan bearbeides videre

interface Shipment {
  id: number;
  contactperson?: string;
  container: string;
  customer: string;
  status?: string;
}

export default function Tables() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, loading, error } = hovedlistenDatabaseData();

  const filteredResults = useFilteredResults(searchTerm, data);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <div>Loading table data...</div>
        <div className="w-10 h-10 border-[3px] border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-red-600">
        <div>Error loading data: {error}</div>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }


  const handleSearch = (query: string) => {
    setSearchTerm(query.trim().toLowerCase());
  }

  const handleSelectedShipment = (row: any) => {
    setSelectedShipment(mapShipmentData(row));
  }
  return (
        <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">
        Tables
      </h1>

        <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

        <section className="mt-8">
            {searchTerm ? (
            filteredResults.length === 0 ? (
                <div> <p>Ingen treff for "{searchTerm}"</p>
                  <a href="/tables"><button onClick={() => setSearchTerm("")}>Tilbake</button>
                  </a>
                </div>
            ) : (
              <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md m-2">
                <DetailView item={mapShipmentData(filteredResults[0])} setSelectedShipment={setSelectedShipment} isEditing={isEditing} onEditModeChange={() => {}} />
              </div>
            )
            ) : (
                
            <div>   
                <TabbedTableGeneration 
                  data={data} 
                  columnConfig={hovedListenColumns} 
                  groupByColumn="customer"
                />
            </div>
            )}
        </section>
        <ExportExcelButton />

        </div>
  );
}
