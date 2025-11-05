"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";

import TableGeneration from "@/app/features/tables/table_presentation/TableGeneration";

;import { HovedListenData } from "@/app/features/tables/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "../features/tables/table_column_structure/HovedListenColumns";

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
  const [results, setResults] = useState<Shipment[]>([]);
  const [searchTrimmed, setSearchTrimmed] = useState(false);
  
  const { data: data, loading, error } = HovedListenData();

  // Basic informasjon relatert til tabell data visningen
  if (loading) return <div>Table is loading...</div>
  if (error) return <div>Error: {error}</div>


  const handleSearch = (query: string) => {
    // fjerner mellomrom og tillater søk med store og små bokstaver
    const trimmed = query.trim().toLowerCase();
    setSearchTerm(trimmed);
    setSearchTrimmed(true);

    // sjekker etter tomt søk, hvis tomt så skjer ingenting
    if (!trimmed) {
      setResults([]);
      return;
    }

  };

  return (
        <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">
        Tables
      </h1>

        <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

        <section style={{ marginTop: 16 }}>
            {searchTrimmed ? (
            results.length === 0 ? (
                <div> <p>Ingen treff for "{searchTerm}"</p><a href="/Home"><button>Tilbake</button></a></div>
            ) : (
                <DetailView filteredItems={results.map(r => ({ id: r.id, name: r.container, customer: r.customer, contactperson: r.contactperson }))} />
            )
            ) : (
                
            <div>   
                <TableGeneration data={data} columnConfig={HovedListenColumns} />
            </div>
            )}
        </section>
        </div>
  );
}
