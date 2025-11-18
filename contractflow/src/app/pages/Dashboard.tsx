// ...existing code...
"use client";

import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import DetailView from "./DetailView";
import TableGeneration from "../../features/tables/component/TableGeneration";
import ShipmentList from "../../components/ShipmentList";
import { hovedListenData } from "../../features/tables/hooks/datatypeStructures/hovedListenData";
import { hovedListenColumns } from "../../features/tables/columns/hovedListenColumns";
import ButtonClear from "../../components/ButtonClear";

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

  const { data, loading, error } = hovedListenData();

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
      plbReference: row.plbReference ?? "",
      plbOrderDate: row.plbOrderDate ?? "",
      customer: row.customer ?? "",
      product: row.product ?? "",
      customerOrderNumber: row.customerOrderNumber ?? "",

      principalContractNumber: String(row.principalContractNumber ?? ""),
      principalContractDate: row.principalContractDate ?? "",
      principalOrderNumber: String(row.principalOrderNumber ?? ""),

      containerNumber: row.containerNumber ?? "",
      bookingNumber: row.bookingNumber ?? "",
      blNumber: row.blNumber ?? "",
      poEta: row.poEta ?? "",
      etd: row.etd ?? "",
      blDate: row.blDate ?? "",
      eta: row.eta ?? "",

      principalInvoiceNumber: String(row.principalInvoiceNumber ?? ""),
      principalInvoiceDate: row.principalInvoiceDate ?? "",
      invoiceDueDate: row.invoiceDueDate ?? "",
      invoiceAmount: row.invoiceAmount ?? 0,
    };
    console.log("data fra HovedListeData", normalized);
    setSelectedShipment(normalized);
  };

  return (
    <div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--text-color-black)] leading-snug mb-4">Hovedlisten</h1>
      <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

      <section className="mt-8">
        {selectedShipment ? (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md m-2">
            {/* <ButtonClear onClick={() => setSelectedShipment(null)}>Tilbake</ButtonClear> */}
            <DetailView item={selectedShipment} setSelectedShipment={setSelectedShipment} />
          </div>
        ) : searchTrimmed ? (
          results.length === 0 ? (
            <div className="bg-white p-2">
              <p>Ingen treff for "{searchTerm}"</p>
              <a href="/Home">
              <ButtonClear>Tilbake</ButtonClear>
              </a>
            </div>
          ) : (
            <ShipmentList filteredItems={results.map((r: any) => ({ id: r.id, name: r.container, customer: r.customer, contactperson: r.contactperson }))} />
          )
        ) : (
          <div className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Alle forsendelser</h2>
            <TableGeneration data={data} columnConfig={hovedListenColumns} onRowClick={handleSelectShipment} />
          </div>
        )}
      </section>
  </div>
  );
}