"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import ClientList from "@/components/ClientList";
import ClientProfilePage from "../../components/ClientProfilePage";
import NewClient from "@/components/NewClient";

import type { ClientSearchItem } from "@/app/types/clientSearch";
import type { ClientOverviewProps } from "@/app/types/client"

import type { Client } from "@/lib/clientdummydata";
import { dummyClients, getClientById, addClient } from "@/lib/clientdummydata";



export default function ClientOverview({ onClientClick, onNewClient, clientId }: ClientOverviewProps) {
  const [searchClient, setSearchClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [hoveredClientId, setHoveredClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    const c = getClientById(clientId);
    if (c) setSelectedClient(c);
  }, [clientId]);

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
      (client.country ?? "").toLowerCase().includes(trimmedClient) ||
      (client.clientAdded ?? "").toLowerCase().includes(trimmedClient) ||
      (client.relation ?? "").toLowerCase().includes(trimmedClient)
    );
    setFilteredClients(clientResults);
  };

  const clientDisplay = searchClient ? (filteredClients.length > 0 ? filteredClients : []) : dummyClients;

  const handleSelectClient = (client: Client) => {
    if (typeof window !== "undefined") {
      window.history.pushState({ clientId: client.id }, "", `/clients/${client.id}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setSelectedClient(client);
    onClientClick?.(client.id);
  };

  const handleCreateClient = (partial: Omit<Client, "id">) => {
    const created = addClient(partial);
    setShowNewClientForm(false);
    handleSelectClient(created);
  };

  if (selectedClient) {
    return (
      <section className="space-y-6">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, color: "#000" }}>Clients</h2>
          <button
            style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }}
            onClick={() => { setShowNewClientForm(true); onNewClient?.(); }}
          >
            + New Client
          </button>
        </div>

        <section className="bg-white rounded-lg border border-black/10 overflow-hidden p-6">
          <ClientProfilePage client={selectedClient} onBack={() => setSelectedClient(null)} />
        </section>

        {showNewClientForm && <NewClient onCreate={handleCreateClient} onCancel={() => setShowNewClientForm(false)} />}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, color: "#000" }}>Clients</h2>
        <button
          style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }}
          onClick={() => { setShowNewClientForm(true); onNewClient?.(); }}
        >
          + New Client
        </button>
      </div>

      <SearchBar placeholder="Search here..." onSearch={handleSearch} />

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
                id: String(c.id), 
                name: c.customer ?? "",
                customer: c.customer ?? "",
                contactperson: c.contactperson,
                title: c.title,
                email: c.email,
                phone: c.phone,
                country: c.country,
                clientAdded: c.clientAdded
              }))}
              onSelectClient={(item: ClientSearchItem) => { 
                const full = getClientById(String(item.id)); 
                if (full) handleSelectClient(full);
              }}
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

      {showNewClientForm && <NewClient onCreate={handleCreateClient} onCancel={() => setShowNewClientForm(false)} />}
    </section>
  );
}