"use client";

import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import ClientList from "@/components/ClientList";
import type { Client } from "@/lib/clientdummydata";
import { dummyClients } from "@/lib/clientdummydata";

interface ClientOverviewProps {
  onClientClick?: (id: string) => void;
  onNewClient?: () => void;
}

export default function ClientOverview({ onClientClick, onNewClient }: ClientOverviewProps) {
  const [searchClient, setSearchClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [hoveredClientId, setHoveredClientId] = useState<string | null>(null);

  // søkefunksjonalitet i klientoversikten
  const handleSearch = (query: string) => {
    setSearchClient(query);
    const trimmedClient = query.trim().toLowerCase();

    if (!trimmedClient) {
      setFilteredClients([]);
      return;
    }

    const clientResults = dummyClients.filter(client =>
      (client.customerCode ?? "").toLowerCase().includes(trimmedClient) ||
      (client.customer ?? "").toLowerCase().includes(trimmedClient) ||
      (client.contactperson ?? "").toLowerCase().includes(trimmedClient) ||
      (client.email ?? "").toLowerCase().includes(trimmedClient) ||
      (client.phone ?? "").toLowerCase().includes(trimmedClient) ||
      (client.country ?? "").toLowerCase().includes(trimmedClient)
    );
    setFilteredClients(clientResults);
  };

  const clientDisplay = searchClient ? (filteredClients.length > 0 ? filteredClients : []) : dummyClients;

  // naviger til profil-side ved klikk
  const handleSelectClient = (client: Client) => {
    onClientClick?.(client.id);
    // enkel navigasjon — bytt til router/link hvis du bruker en router
    window.location.href = `/clients/${client.id}`;
  };

  return (
    <section className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, color: "#000" }}>Clients</h2>
        <button style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }} onClick={onNewClient}>
          + New Client
        </button>
      </div>

      <SearchBar placeholder="Search by Client No, Company Name or Contact Person..." onSearch={handleSearch} />

      <section className="bg-white rounded-lg border border-black/10 overflow-hidden">
        {searchClient ? (
          filteredClients.length === 0 ? (
            <div style={{ padding: 16 }}>
              <p>No clients found for "{searchClient}"</p>
              <a href="/clients"><button>Back</button></a>
            </div>
          ) : (
            <ClientList
              filteredClients={filteredClients.map(c => ({
                id: Number(c.id),
                name: c.customer ?? "",
                customer: c.customer ?? "",
                contactperson: c.contactperson,
                title: c.title,
                email: c.email,
                phone: c.phone,
                country: c.country
              }))}
            />
          )
        ) : (
          <div style={{ padding: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
              <thead style={{ background: "#f7f7f7", borderBottom: "2px solid #ddd", fontSize: 16, color: "#000", fontFamily: "Arial, sans-serif" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>Client No</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Company Name</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Contact Person</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Email</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Phone</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Country</th>
                </tr>
              </thead>
              <tbody>
                {clientDisplay.map(client => (
                  <tr
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    onMouseEnter={() => setHoveredClientId(client.id)}
                    onMouseLeave={() => setHoveredClientId(null)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: hoveredClientId === client.id ? "#f0f0f0" : undefined,
                      transition: "background-color 0.3s"
                    }}
                  >
                    <td style={{ padding: 8 }}>{client.customerCode}</td>
                    <td style={{ padding: 8 }}>{client.customer}</td>
                    <td style={{ padding: 8 }}>{client.contactperson}</td>
                    <td style={{ padding: 8 }}>{client.email}</td>
                    <td style={{ padding: 8 }}>{client.phone}</td>
                    <td style={{ padding: 8 }}>{client.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}