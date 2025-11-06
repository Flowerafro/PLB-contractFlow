// ...existing code...
"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import TableGeneration from "@/features/tables/table_presentation/TableGeneration";
import { HovedListenData } from "@/features/tables/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "@/features/tables/table_column_structure/HovedListenColumns";
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
    console.log("searched query", results);

    if (!trimmed) {
      setResults([]);
      return;
    }

    const source = Array.isArray(data) ? data : [];
    const found = source.filter((row: any) => {
      return (
        String(row.container ?? "").toLowerCase().includes(trimmed) ||
        String(row.customer ?? "").toLowerCase().includes(trimmed) ||
        String(row.bookingNumber ?? "").toLowerCase().includes(trimmed) ||
        String(row.client ?? "").toLowerCase().includes(trimmed) ||
        String(row.product ?? "").toLowerCase().includes(trimmed) ||
        String(row.principalContractNumber ?? "").toLowerCase().includes(trimmed) ||
        String(row.principalContractDate ?? "").toLowerCase().includes(trimmed) ||
        String(row.principalOrderNumber ?? "").toLowerCase().includes(trimmed) ||
        String(row.principalOrderDate ?? "").toLowerCase().includes(trimmed) 
      );
    });

    setResults(found);
  };

/* const normalized samler alle verdier til de ulike data fra HovedListenData */

    const handleSelectShipment = (row: any) => {
    console.log("selected row", row);
    const normalized = {
      id: row.id ?? null,
      customerOrderNumber: row.customerOrderNumber?? null,
      customer: row.customer ?? null,
      containerNumber: row.containerNumber ?? null,
      product: row.product ?? null,
      poEta: row.poEta ?? null,
      etd: row.etd ?? null,
      invoiceNumber: row.principalInvoiceNumber ?? null,
      invoiceAmount: row.invoiceAmount ?? null,
      bookingNumber: row.bookingNumber ?? null,
      blNumber: row.blNumber ?? null,
      principalContractNumber: row.principalContractNumber ?? null,
      principalContractDate: row.principalContractDate ?? null,
      principalOrderNumber: row.principalOrderNumber ?? null,
      principalOrderDate: row.principalOrderDate ?? null,
    };
    console.log("data fra HovedListeData", normalized);
    setSelectedShipment(normalized);
  };

  return (
    <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">Hovedlisten</h1>
      <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

      <section style={{ marginTop: 16 }}>
        {selectedShipment ? (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md m-2">
            <button className="mb-4 px-3 py-1 rounded bg-gray-200" onClick={() => setSelectedShipment(null)}>Tilbake</button>
            <DetailView item={selectedShipment} />
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
            <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Alle forsendelser</h2>
            <TableGeneration data={data} columnConfig={HovedListenColumns} onRowClick={handleSelectShipment} />
          </div>
        )}
      </section>
  </div>
  );
}