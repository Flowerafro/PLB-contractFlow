"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/searchComponents/SearchBar";
import ClientList from "@/components/clientComponents/ClientList";
import ClientProfilePage from "@/components/clientComponents/ClientProfilePage";
import NewClient from "@/components/clientComponents/NewClient";
import Button from "@/components/buttons/Button";
import useHoverEffect from "../hooks/useHoverEffect";

//import { dummyClients, addClient, getClientById } from "../../lib/clientdummydata";
//import type { Client } from "../../lib/clientdummydata";


/*
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
*/

/*
  const handleCreateClient = (partial: Omit<Client, "id">) => {
    const created = addClient(partial);
    setShowNewClientForm(false);
    handleSelectClient(created);
  };
*/
import type { ClientOverviewProps } from "../types/client";

interface Client {
  id: string;
  customerCode?: string;
  customer?: string;
  relation?: string;
  contactperson?: string;
  title?: string;
  email?: string;
  phone?: string;
  country?: string;
  clientAdded?: string;
  status?: string;
}

export default function ClientOverview({ onClientClick, onNewClient, clientId }: ClientOverviewProps) {
  const [searchClient, setSearchClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { hoverEffect, onHover, onLeave } = useHoverEffect<string>();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Failed to fetch clients');
        const data = await response.json() as any;
        if (data.success) {
          const clients = data.data.map((c: any) => ({
            id: c.id.toString(),
            customerCode: c.customerCode,
            customer: c.name,
            email: c.email,
            phone: c.phone,
            country: c.country,
            status: c.status,
            clientAdded: c.createdAt
          }));
          setAllClients(clients);
          setFilteredClients(clients);
        } else {
          setError((data as any).error?.message || 'Failed to load clients');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (!clientId) return;
    const c = allClients.find(client => client.id === clientId);
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
      const response = await fetch(`/api/clients?query=${encodeURIComponent(trimmedQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      if ((data as any).success) {
        setFilteredClients((data as any).data.map((c: any) => ({
          id: c.id.toString(),
          customerCode: c.customerCode,
          customer: c.name,
          email: c.email,
          phone: c.phone,
          country: c.country,
          status: c.status,
          clientAdded: c.createdAt
        })));
      } else {
        setError((data as any).error?.message || 'Search failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search error');
    }
  };
  const clientDisplay = searchClient ? filteredClients : allClients;

  const handleSelectClient = (client: Client) => {
    if (typeof window !== "undefined") {
      window.history.pushState({ clientId: client.id }, "", `/clients/${client.id}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setSelectedClient(client);
    onClientClick?.(client.id);
  };

  const handleCreateClient = async (partial: Omit<Client, "id" | "createdAt" | "status">) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...partial, status: 'ACTIVE' })
      });
      if (!response.ok) throw new Error('Failed to create client');
      const data = await response.json() as any;
      if (data.success) {
        const newClient = data.data;
        setAllClients(prev => [...prev, newClient]);
        setFilteredClients(prev => [...prev, newClient]);
        setShowNewClientForm(false);
        handleSelectClient(newClient);
      } else {
        setError(data.error?.message || 'Failed to create client');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create error');
    }
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
                {clientDisplay.map(client => (
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
                    <td className="p-4">{client.customer}</td>
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