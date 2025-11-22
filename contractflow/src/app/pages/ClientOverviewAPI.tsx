// Ligger klart for når databasen er satt opp. da skal denne filen hente kundedata fra clientAPI

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