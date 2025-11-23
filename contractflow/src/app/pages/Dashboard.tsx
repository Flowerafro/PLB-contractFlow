"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import ButtonClear from "../../components/ButtonClear";
import TableGeneration from "@/components/featureComponents/TableGeneration";
import ShipmentList from "@/components/ShipmentList";
import { hovedListenData } from "@/features/tables/hooks/datatypeStructures/hovedListenData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import mapShipmentData from "@/lib/mapShipmentData";
import useFilteredResults from "../hooks/useFilteredResults";



export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, sethasSearched] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, loading, error } = hovedListenData();

  const handleSearch = (query: string) => {
    setSearchTerm(query.trim().toLowerCase());
    sethasSearched(true);
  };

  const filteredResults = useFilteredResults(searchTerm, data) 
     const handleSelectShipment = (row: any) => {
      setSelectedShipment(mapShipmentData(row)
      );
  }; 

  if (loading) return <div>Table is loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">Hovedlisten</h1>
      <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

      <section className="mt-8">
        {selectedShipment ? (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md m-2">
            <DetailView item={selectedShipment} setSelectedShipment={setSelectedShipment} isEditing={isEditing} onEditModeChange={setIsEditing} />
          </div>
        ) : hasSearched ? (
          filteredResults.length === 0 ? (
            <div className="bg-white p-2">
              <p>Ingen treff for "{searchTerm}"</p>
              <a href="/Home">
              <ButtonClear>Tilbake</ButtonClear>
              </a>
            </div>
          ) : (
            <ShipmentList filteredItems={filteredResults} onSelectShipment={handleSelectShipment} />
          )
        ) : (
<div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md w-full">
<h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">
            Alle forsendelser
          </h2>
        
          <div className="overflow-x-auto w-full flex justify-center">
            <div className="min-w-full max-w-[1200px]">
              <TableGeneration 
                data={data}
                columnConfig={hovedListenColumns}
                onRowClick={handleSelectShipment}
              />
            </div>
          </div>
        </div>
        
        )}
      </section>
  </>
  );
}