// ...existing code...
"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import TableGeneration from "@/app/tableRelated/table_presentation/TableGeneration";
import { HovedListenData } from "@/app/tableRelated/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "../tableRelated/table_column_structure/HovedlistenColumns";
import ShipmentList from "@/components/ShipmentList";

interface Shipment {
  id: number;
  contactperson?: string;
  container: string;
  customer: string;
  status?: string;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [searchTrimmed, setSearchTrimmed] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);

  const { data, loading, error } = HovedListenData();

  // Basic informasjon relatert til tabell data visningen
  if (loading) return <div>Table is loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  const handleSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    setSearchTerm(trimmed);
    setSearchTrimmed(true);

    if (!trimmed) {
      setResults([]);
      return;
    }

    const source = Array.isArray(data) ? data : [];
    const found = source.filter((row: any) => {
      return (
        String(row.container ?? "").toLowerCase().includes(trimmed) ||
        String(row.customer ?? "").toLowerCase().includes(trimmed) ||
        String(row.contactperson ?? "").toLowerCase().includes(trimmed)
      );
    });

    setResults(found);
  };

  const handleSelectShipment = (row: any) => {
    setSelectedShipment(row ?? null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold p-6">Hovedlisten</h1>
      <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

      <section style={{ marginTop: 16 }}>
        {selectedShipment ? (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">
            <button className="mb-4 px-3 py-1 rounded bg-gray-200" onClick={() => setSelectedShipment(null)}>Tilbake</button>
            <DetailView item={{
              id: selectedShipment.id,
              name: selectedShipment.container ?? selectedShipment.name,
              customer: selectedShipment.customer,
              contactperson: selectedShipment.contactperson
            }} />
          </div>
        ) : searchTrimmed ? (
          results.length === 0 ? (
            <div>
              <p>Ingen treff for "{searchTerm}"</p>
              <a href="/Home"><button className="px-4 py-2 rounded text-white bg-[var(--primary-color)]">Tilbake</button></a>
            </div>
          ) : (
            <ShipmentList filteredItems={results.map((r: any) => ({ id: r.id, name: r.container, customer: r.customer, contactperson: r.contactperson }))} />
          )
        ) : (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Alle forsendelser</h2>
            <TableGeneration data={data} columnConfig={HovedListenColumns} onRowClick={handleSelectShipment} />
          </div>
        )}
      </section>
    </div>
  );
}
// ...existing code...