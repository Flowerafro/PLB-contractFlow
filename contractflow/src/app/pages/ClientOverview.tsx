"use client";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import ClientDetailView from "./ClientDetailView";
import Layout from "./Layout";

interface ClientOverviewProps {
  onClientClick?: (id: string) => void;
  onNewClient?: () => void;
}

interface Client {
  id: string;
  customerCode: string;
  customer: string;
  contactperson: string;
  title: string;
  email: string;
  phone: string;
  country: string;
}

export default function ClientOverview({ onClientClick, onNewClient }: ClientOverviewProps) {
  const [searchClient, setSearchClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [hoveredClientId, setHoveredClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const dummyClients: Client[] = [
    { id: "1", customerCode: "CL-001", customer: "Nordic Supplies AS", contactperson: "Lars Hansen", title: "Project Manager", email: "lars@nordicsupplies.no", phone: "+47 98765432", country: "Norway" },
    { id: "2", customerCode: "CL-002", customer: "Baltic Traders", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@baltictraders.pl", phone: "+48 123456789", country: "Poland" },
    { id: "3", customerCode: "CL-003", customer: "Scandinavian Woods", contactperson: "Erik Svensson", title: "Logistics Manager", email: "erik@scandwoods.se", phone: "+46 987654321", country: "Sweden" },
    { id: "4", customerCode: "CL-004", customer: "Euro Forest Ltd", contactperson: "Maria Schmidt", title: "Logistics Manager", email: "maria@euroforest.de", phone: "+49 234567890", country: "Germany" },
    { id: "5", customerCode: "CL-005", customer: "Alpine Wood Co", contactperson: "Jean Dupont", title: "Product Designer", email: "jean@alpinewood.fr", phone: "+33 345678901", country: "France" },
    { id: "6", customerCode: "CL-006", customer: "Nordic Timber Group", contactperson: "Olaf Jansen", title: "Quality Assurance", email: "olaf@nordictimber.fi", phone: "+358 456789012", country: "Finland" },
    { id: "7", customerCode: "CL-007", customer: "Baltic Wood Exports", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@balticwood.pl", phone: "+48 234567890", country: "Poland" },
    { id: "8", customerCode: "CL-008", customer: "Nordic Trading House", contactperson: "Lars Bertilsen", title: "HR Specialist", email: "lars@nordictrading.no", phone: "+47 87654321", country: "Norway" },
  ];

// søkefunksjonalitet i klientoversikten
  const handleSearch = (query: string) => {
    setSearchClient(query);
    const trimmedClient = query.trim().toLowerCase();

    if (!trimmedClient) {
      setFilteredClients([]);
      return;
    }

    const clientResults = dummyClients.filter(client =>
      client.customerCode.toLowerCase().includes(trimmedClient) ||
      client.customer.toLowerCase().includes(trimmedClient) ||
      client.contactperson.toLowerCase().includes(trimmedClient) ||
        client.email.toLowerCase().includes(trimmedClient) ||
        client.phone.toLowerCase().includes(trimmedClient) ||
        client.country.toLowerCase().includes(trimmedClient)
    );
    setFilteredClients(clientResults);
  };

  const clientDisplay = searchClient ? (filteredClients.length > 0 ? filteredClients : []) : dummyClients;

  // funksjon som tillater klikk på klient
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    onClientClick?.(client.id);
  };

  return (
    <Layout>
    <section className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, color: "#000" }}>Clients</h2>
        <button style={{ backgroundColor: "#1D391D", color: "#fff", padding: "8px 16px", borderRadius: "4px" }} onClick={onNewClient}>
          + New Client
        </button>
      </div>

      <SearchBar placeholder="Search by Client No, Company Name or Contact Person..." onSearch={handleSearch} />

      <section className="bg-white rounded-lg border border-black/10 overflow-hidden">
        {selectedClient ? (
          <div style={{ padding: 16 }}>
            <ClientDetailView
              filteredClients={[{
                id: Number(selectedClient.id),
                name: selectedClient.customer,
                customer: selectedClient.customer,
                contactperson: selectedClient.contactperson
              }]}
            />
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setSelectedClient(null)}>Back</button>
            </div>
          </div>
        ) : (
          <>
            {searchClient ? (
              filteredClients.length === 0 ? (
                <div style={{ padding: 16 }}>
                  <p>No clients found for "{searchClient}"</p>
                  <a href="/clients"><button>Back</button></a>
                </div>
              ) : (
                <ClientDetailView filteredClients={filteredClients.map(c => ({ id: Number(c.id), name: c.customer, customer: c.customer, contactperson: c.contactperson, title: c.title, email: c.email, phone: c.phone, country: c.country }))} />
              )
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </section>
    </section>
    </Layout>
  );
}