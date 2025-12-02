"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/searchComponents/SearchBar";
import ClientList from "@/components/clientComponents/ClientList";
import ClientProfilePage from "@/components/clientComponents/ClientProfilePage";
import NewClient from "@/components/clientComponents/NewClient";
import Button from "@/components/buttons/Button";
import useHoverEffect from "../hooks/useHoverEffect";
import { clientAPI } from "@/server/databaseDataRetrieval/utilizations/apiClient";
import type { DBClient } from "@/db/schema/schema";

export interface ClientOverviewProps {
    onClientClick?: (id: string) => void;
    onNewClient?: () => void;
    clientId?: string;
}

export default function ClientOverview({ onClientClick, onNewClient, clientId }: ClientOverviewProps) {
  const [searchClient, setSearchClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<DBClient[]>([]);
  const [allClients, setAllClients] = useState<DBClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<DBClient | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { hoverEffect, onHover, onLeave } = useHoverEffect<string>();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const result = await clientAPI.list();
        if (result.success && result.data) {
          setAllClients(result.data);
          setFilteredClients(result.data);
        } else {
          setAllClients([]);
          setFilteredClients([]);
          setError(result.error?.message || 'Failed to load clients');
        }
      } catch (err) {
        console.error('API error:', err);
        setAllClients([]);
        setFilteredClients([]);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (!clientId) return;
    const c = allClients.find(client => client.id === parseInt(clientId));
    if (c) setSelectedClient(c);
  }, [clientId, allClients]);

  const handleSearch = async (query: string) => {
    setSearchClient(query);
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setFilteredClients(allClients);
      return;
    }

    try {
      const result = await clientAPI.search(trimmedQuery);
      if (result.success && result.data) {
        setFilteredClients(result.data);
        return;
      } else {
        const filtered = allClients.filter(client =>
          client.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          (client.email && client.email.toLowerCase().includes(trimmedQuery.toLowerCase())) ||
          (client.customerCode && client.customerCode.toLowerCase().includes(trimmedQuery.toLowerCase()))
        );
        setFilteredClients(filtered);
        setError(result.error?.message || 'Search failed, using local filter');
      }
    } catch (err) {
      console.error('Search error:', err);
      // Fallback: filter locally
      const filtered = allClients.filter(client =>
        client.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(trimmedQuery.toLowerCase())) ||
        (client.customerCode && client.customerCode.toLowerCase().includes(trimmedQuery.toLowerCase()))
      );
      setFilteredClients(filtered);
      setError(err instanceof Error ? err.message : 'Search error, using local filter');
    }
  };
  const clientDisplay = searchClient ? filteredClients : allClients;

  const handleSelectClient = (client: DBClient) => {
    if (typeof window !== "undefined") {
      window.history.pushState({ clientId: client.id }, "", `/clients/${client.id}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setSelectedClient(client);
    onClientClick?.(client.id.toString());
  };

  const handleCreateClient = (newClient: DBClient) => {
    setAllClients(prev => [...prev, newClient]);
    setFilteredClients(prev => [...prev, newClient]);
    setShowNewClientForm(false);
    handleSelectClient(newClient);
  };

  if (selectedClient) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Clients</h2>
          <Button onClick={() => { setShowNewClientForm(true); onNewClient?.(); }} >
            + New Client
          </Button>
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
      </div>

      <SearchBar placeholder="Search here..." onSearch={handleSearch} />

      <section className="bg-white rounded-lg border border-black/10 overflow-hidden">
        {loading ? (
          <div className="p-4">Loading clients...</div>
        ) : error ? (
          <div className="p-4 text-red-500">Error: {error}</div>
        ) : searchClient ? (
          filteredClients.length === 0 ? (
            <div className="p-4">
              <p>No clients found for "{searchClient}"</p>
              <button onClick={() => handleSearch("")}>Back</button>
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
                  <th className="text-left p-2">Client Code</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Country</th>
                </tr>
              </thead>
              <tbody>
                {(clientDisplay && Array.isArray(clientDisplay) ? clientDisplay : []).map(client => (
                  <tr
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    onMouseEnter={() => onHover(client.id.toString())}
                    onMouseLeave={() => onLeave()} className={`cursor-pointer transition-colors ${hoverEffect === client.id.toString() ? "bg-gray-100" : ""}`}>
                       <td className="p-2"> {client.status === "ACTIVE" ? ( 
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                      ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-gray-800 rounded-full">Inactive</span>
                      )} </td>
                    <td className="p-4">{client.customerCode}</td>
                    <td className="p-4">{client.name}</td>
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