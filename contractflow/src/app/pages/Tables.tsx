"use client";

import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import TabbedTableGeneration from "@/features/components/TabbedTableGeneration";
import { hovedListenData } from "@/features/tables/hooks/datatypeStructures/hovedListenData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import { exportTableToExcel } from "@/lib/exportTableToExcel";
import ExportExcelButton from "@/components/ExportExcelButton"
import { HovedListeItem } from "../types/hovedlisten";

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
  
  const { data: data, loading, error } = hovedListenData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] flex-col gap-4">

        <div>Loading table data...</div>
        <div className="w-10 h-10 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />

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
      <div className="flex justify-center items-center h-[50vh] flex-col gap-4 text-red-600">

        <div>Error loading data: {error}</div>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
          Retry
        </button>
      </div>
    );
  }


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

        <section className="mt-4">
        {searchTrimmed ? (
            results.length === 0 ? (
                <div> <p>Ingen treff for "{searchTerm}"</p><a href="/Home"><button>Tilbake</button></a></div>
            ) : (
                <DetailView filteredItems={results.map(r => ({ id: r.id, name: r.container, customer: r.customer, contactperson: r.contactperson }))} />
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

/*
Beholdt opprinnelig kode:
"use client";

import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import TabbedTableGeneration from "@/features/tables/component/TabbedTableGeneration";
import { hovedListenData } from "@/features/tables/hooks/datatypeStructures/hovedListenData";
import { hovedListenColumns } from "@/features/tables/columns/hovedListenColumns";
import { exportTableToExcel } from "@/lib/exportTableToExcel";
import ExportExcelButton from "@/components/ExportExcelButton"
import { HovedListeItem } from "../types/hovedlisten";

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
  
  const { data: data, loading, error } = hovedListenData();

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
*/