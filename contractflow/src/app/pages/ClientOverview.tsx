"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ClientList from "@/components/clientComponents/ClientList";
import ClientProfilePage from "@/components/clientComponents/ClientProfilePage";
import NewClient from "@/components/clientComponents/NewClient";

import { dummyClients, addClient, getClientById } from "../../lib/clientdummydata";
import type { Client } from "../../lib/clientdummydata";

import type { ClientOverviewProps } from "../types/client";
import Button from "@/components/Button";




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
      (client.relation ?? "").toLowerCase().includes(trimmedClient) ||
      (client.status ?? "").toLowerCase().includes(trimmedClient)
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Clients</h2>
          <Button onClick={() => { setShowNewClientForm(true); onNewClient?.(); }} >
            + New Client
          </Button>
        {/*   <button 
            style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }}
            onClick={() => { setShowNewClientForm(true); onNewClient?.(); }}
          >
            + New Client
          </button> */}
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Clients</h2>
          <Button onClick={() => { setShowNewClientForm(true); onNewClient?.(); }} >
            + New Client
          </Button>
      {/*   <button
          style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }}
          onClick={() => { setShowNewClientForm(true); onNewClient?.(); }}
        >
          + New Client
        </button> */}
      </div>

      <SearchBar placeholder="Search here..." onSearch={handleSearch} />

      <section className="bg-white rounded-lg border border-black/10 overflow-hidden">
        {searchClient ? (
          filteredClients.length === 0 ? (
            <div className="p-4">
              <p>No clients found for "{searchClient}"</p>
              <a href="/clients"><button>Back</button></a>
            </div>
          ) : (
            <ClientList filteredClients={filteredClients} onSelectClient={handleSelectClient} />
          )
        ) : (
          <div className="p-4">
          <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-100 border-b-2 border-gray-300 text-[16px] text-black font-sans">
                <tr>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Client No</th>
                  <th className="text-left p-2">Company Name</th>
                  <th className="text-left p-2">Contact Person</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Country</th>
                </tr>
              </thead>
              <tbody>
                {clientDisplay.map(client => (
                  <tr
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    onMouseEnter={() => setHoveredClientId(client.id)}
                    onMouseLeave={() => setHoveredClientId(null)} className={`cursor-pointer transition-colors ${hoveredClientId === client.id ? "bg-gray-100" : ""}`}>
                       <td className="p-2"> {client.status === "Active" ? ( 
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                      ) : client.status === "Inactive" ? (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
                      ) : null} </td>
                    <td className="p-4">{client.customerCode}</td>
                    <td className="p-4">{client.customer}</td>
                    <td className="p-4">{client.contactperson}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone}</td>
                    <td className="p-4">{client.country}</td>
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