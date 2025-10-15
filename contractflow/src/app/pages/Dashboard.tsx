"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DetailView from "./DetailView";

interface Shipment {
  id: number;
  contactperson?: string;
  container: string;
  client: string;
  status?: string;
}

const dummyShipments: Shipment[] = [
  { id: 1, container: "ABC123", client: "Maverick Foods", status: "In transit", contactperson: "John Doe" },
  { id: 2, container: "DEF456", client: "Sterling Products", status: "Delivered", contactperson: "Jane Smith" },
  { id: 3, container: "GHI789", client: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 4, container: "JKL012", client: "Nordic Foods", status: "In transit", contactperson: "Anna Lee" },
  { id: 5, container: "MNO345", client: "PEace Products", status: "Delayed", contactperson: "Tom Brown" },
  { id: 6, container: "PQR678", client: "Potato BBoys", status: "In transit", contactperson: "Lisa White" },
  { id: 7, container: "STU901", client: "Veggie Delights", status: "In transit", contactperson: "Mark Green"},
  { id: 8, container: "GHI729", client: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 9, container: "JKL112", client: "Nordic Foods", status: "Delivered", contactperson: "Anna Banana" },
  { id: 10, container: "GHG711", client: "CH Alimentos", status: "Awaiting pickup", contactperson: "Carlos Ruiz" },
  { id: 11, container: "JKE034", client: "Swedish Kjottabulla", status: "Ready", contactperson: "Kong Karl" },

];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Shipment[]>([]);
  const [searchTrimmed, setSearchTrimmed] = useState(false);

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
      shipment.container.toLowerCase().includes(trimmed) || shipment.client.toLowerCase().includes(trimmed)
    );
    setResults(found);
  };

  return (
    <div>
      <h1>Hovedlisten</h1>
      <SearchBar onSearch={handleSearch} placeholder="Søk etter container eller kunde..." />

      <section style={{ marginTop: 16 }}>
        {searchTrimmed ? (
          results.length === 0 ? (
            <p>Ingen treff for "{searchTerm}"</p>
          ) : (
            <DetailView filteredItems={results.map(r => ({ id: r.id, name: r.container, client: r.client, contactperson: r.contactperson }))} />
          )
        ) : (
            
          <div>
            <h2>Alle forsendelser</h2>
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
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.client}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.status}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{shipment.contactperson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
