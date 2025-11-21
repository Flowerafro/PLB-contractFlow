"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ClientList from "@/components/clientComponents/ClientList";
import ClientProfilePage from "@/components/clientComponents/ClientProfilePage";
import NewClient from "@/components/clientComponents/NewClient";

import { clientAPI } from "../../lib/clientAPI";

import type { Client } from "../types/client";
import type { ClientSearchItem } from "../types/clientSearch";
import type { ClientOverviewProps } from "../types/client";
import type { CreateClientInput } from "../../features/fileHandling/interfaces/createClientInput";
import Button from "../../components/Button";


export default function ClientOverview({ clientId }: ClientOverviewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState<ClientSearchItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

/* DB ikke helt på plass - så klienter vises ikke */

  // henter klientliste når siden laster inn
 useEffect(() => {
    async function loadClients() {
      try {
        const list = await clientAPI.list();
        setClients(list);
      } catch (error) {
        console.error("Feil ved innlasting av klienter:", error);
      }
    }
    loadClients();
  }, []);


// når url har id på klient, hent klienten
  useEffect(() => {
    if (!clientId) return;

    async function loadClient() {
      try {
        const data = await clientAPI.get(Number(clientId));
        if (data) setSelectedClient(data);
      } catch (error) {
        console.error("Feil ved innlasting av klient:", error);
      }
    }
    loadClient();
  }, [clientId]);

// når PLB vil søke etter kunde så søker de midlertidig i clientAPI

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredClients([]);
      return;
    }

    try {
      const results = await clientAPI.search(query);
      setFilteredClients(results);
    } catch (error) {
      console.error("Feil i søk:", error);
      setFilteredClients([]);
    }
  };

// når PLB klikker på en klient fra søkeresultat, hent full klientdata

const handleSelectClient = async (item: ClientSearchItem | Client) => {
    const id = item.id;

    // Update URL
    if (typeof window !== "undefined") {
      window.history.pushState({ clientId: id }, "", `/clients/${id}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    try {
      const full = await clientAPI.get(id);
      if (full) {
        setSelectedClient(full);
        setFilteredClients([]);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Feil ved henting av klient:", error);
    }
  };


// opprette ny klient via clientAPI

const handleCreateClient = async (created: Client) => {
  setShowNewClientForm(false);
  handleSelectClient(created);
};


  // Logikk om hva som skjer når man klikker på en klient/kuunde

  if (selectedClient) {
    return (
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-black">Clients</h2>
          <Button onClick={() => setShowNewClientForm(true)}>
            + New Client
          </Button>
        </div>

        <section className="bg-white rounded-lg border p-6">
          <ClientProfilePage client={selectedClient} onBack={() => setSelectedClient(null)} />
        </section>

        {showNewClientForm && (
          <NewClient onCreate={handleCreateClient} onCancel={() => setShowNewClientForm(false)} />
        )}
      </section>
    );
  }


  return (
    <section className="space-y-6">
       <div className="flex justify-between items-center">
        <h2 className="m-0 text-black">Clients</h2>
         <Button onClick={() => setShowNewClientForm(true)}>
            + New Client
          </Button>
      </div>
      <SearchBar placeholder="Search here..." onSearch={handleSearch} />
      <section className="bg-white rounded-lg border border-black/10 overflow-hidden p-4">
        {searchQuery ? (
          filteredClients.length === 0 ? (
            <div className="p-4">
              <p>No clients found for "{searchQuery}"</p>
              <a href="/clients"><button>Back</button></a>
            </div>
          ) : (
            <ClientList
              filteredClients={filteredClients}
              onSelectClient={handleSelectClient}
            />
          )
        ) : (
          // Default → vis alle klienter
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-2">Client No</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => handleSelectClient(client)}
                >
                  <td className="p-2">{client.customerCode}</td>
                  <td className="p-2">{client.name}</td>
                  <td className="p-2">{client.email}</td>
                  <td className="p-2">{client.phone}</td>
                  <td className="p-2">{client.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {showNewClientForm && (
        <NewClient onCreate={handleCreateClient} onCancel={() => setShowNewClientForm(false)} />
      )}
    </section>
  )


}
/* 
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
}  */