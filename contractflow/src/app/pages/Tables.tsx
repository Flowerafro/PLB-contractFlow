"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";
import Layout from "@/app/pages/Layout";
import ParseExcel from "../fileHandling/potentialLaterImplementations/ParseExcel";

import TableGeneration from "@/app/tableRelated/table_presentation/TableGeneration";

;import { HovedListenData } from "@/app/tableRelated/custom_hooks/specializedStructures/HovedListenData";
import { HovedListenColumns } from "../tableRelated/table_column_structure/HovedlistenColumns";
import UploadFile from "../fileHandling/UploadFile";

//  -Tables-siden
//  Her er dashboard siden lagt over slik at den kan bearbeides videre

interface Shipment {
  id: number;
  contactperson?: string;
  container: string;
  customer: string;
  status?: string;
}

// midlertidig dummy-data for testing av søkefunksjonalitet
const dummyShipments: Shipment[] = [
  { id: 1, container: "ABC123", customer: "Maverick Foods", status: "In transit", contactperson: "John Doe" },
  { id: 2, container: "DEF456", customer: "Sterling Products", status: "Delivered", contactperson: "Jane Smith" },
  { id: 3, container: "GHI789", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 4, container: "JKL012", customer: "Nordic Foods", status: "In transit", contactperson: "Anna Lee" },
  { id: 5, container: "MNO345", customer: "PEace Products", status: "Delayed", contactperson: "Tom Brown" },
  { id: 6, container: "PQR678", customer: "Potato BBoys", status: "In transit", contactperson: "Lisa White" },
  { id: 7, container: "STU901", customer: "Veggie Delights", status: "In transit", contactperson: "Mark Green"},
  { id: 8, container: "GHI729", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 9, container: "JKL112", customer: "Nordic Foods", status: "Delivered", contactperson: "Anna Banana" },
  { id: 10, container: "GHG711", customer: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 11, container: "JKE034", customer: "Swedish Kjottabulla", status: "Ready", contactperson: "Kong Karl" },
];

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

    // midlertidig: filtrerer dummy-data frem til vi får backend
    const found = dummyShipments.filter(shipment =>
      shipment.container.toLowerCase().includes(trimmed) || shipment.customer.toLowerCase().includes(trimmed)
    );
    setResults(found);
  };

  return (
    <Layout>
        <div>
        <h1 className="text-3xl font-bold text-green-500 p-6 bg-gray-100 rounded-lg">
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
                <UploadFile />

                <h2>Noen forsendelser</h2>
    {/*  
        Bevart kode fra tidligere eksempel på tabellvisning:

                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <thead style={{ background: "#f7f7f7", borderBottom: "2px solid #ddd", fontSize: 16, color: "#000", fontFamily: "Arial, sans-serif" }}>
                    <tr>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>PLB-REF</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Container</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Kunde</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Status</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Kontaktperson</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: 14, color: "#333", fontFamily: "Arial, sans-serif" }}>
                    {dummyShipments.map(shipment => (
                    <tr key={shipment.id}>
                        <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.id}</td>
                        <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.container}</td>
                        <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.customer}</td>
                        <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.status}</td>
                        <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.contactperson}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
    */}            
                <TableGeneration data={data} columnConfig={HovedListenColumns} />
            </div>
            )}
        </section>
        </div>
    </Layout>
  );
}
