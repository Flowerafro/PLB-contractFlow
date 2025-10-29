"use client";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import ClientDetailView from "./ClientDetailView";
import Layout from "./Layout";
import ClientList from "@/components/ClientList";

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
    { id: "1", customerCode: "CL-0001", customer: "Nordic Supplies AS", contactperson: "Lars Hansen", title: "Project Manager", email: "lars@nordicsupplies.no", phone: "+47 98765432", country: "Norway" },
    { id: "2", customerCode: "CL-0002", customer: "Baltic Traders", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@baltictraders.pl", phone: "+48 123456789", country: "Poland" },
    { id: "3", customerCode: "CL-0003", customer: "Scandinavian Woods", contactperson: "Erik Svensson", title: "Logistics Manager", email: "erik@scandwoods.se", phone: "+46 987654321", country: "Sweden" },
    { id: "4", customerCode: "CL-0004", customer: "Euro Forest Ltd", contactperson: "Maria Schmidt", title: "Logistics Manager", email: "maria@euroforest.de", phone: "+49 234567890", country: "Germany" },
    { id: "5", customerCode: "CL-0005", customer: "Alpine Wood Co", contactperson: "Jean Dupont", title: "Product Designer", email: "jean@alpinewood.fr", phone: "+33 345678901", country: "France" },
    { id: "6", customerCode: "CL-0006", customer: "Nordic Timber Group", contactperson: "Olaf Jansen", title: "Quality Assurance", email: "olaf@nordictimber.fi", phone: "+358 456789012", country: "Finland" },
    { id: "7", customerCode: "CL-0007", customer: "Baltic Wood Exports", contactperson: "Anna Kowalski", title: "Sales Representative", email: "anna@balticwood.pl", phone: "+48 234567890", country: "Poland" },
    { id: "8", customerCode: "CL-0008", customer: "Nordic Trading House", contactperson: "Lars Bertilsen", title: "HR Specialist", email: "lars@nordictrading.no", phone: "+47 87654321", country: "Norway" },
      { id: "9", customerCode: "CL-0009", customer: "Baltic Marine Logistics", contactperson: "Piotr Nowak", title: "Operations Manager", email: "piotr@balticmarine.pl", phone: "+48 512345678", country: "Poland" },
  { id: "10", customerCode: "CL-0010", customer: "Arctic Timber AS", contactperson: "Ingrid Nilsen", title: "Procurement Officer", email: "ingrid@arctictimber.no", phone: "+47 90123456", country: "Norway" },
  { id: "11", customerCode: "CL-0011", customer: "Teutonic Freight GmbH", contactperson: "Klaus Becker", title: "Warehouse Supervisor", email: "klaus@teutonicfreight.de", phone: "+49 301234567", country: "Germany" },
  { id: "12", customerCode: "CL-0012", customer: "Celtic Trade Partners", contactperson: "Aoife O’Connor", title: "Customer Relations", email: "aoife@celtictrade.ie", phone: "+353 861234567", country: "Ireland" },
  { id: "13", customerCode: "CL-0013", customer: "NordSea Export", contactperson: "Mikkel Larsen", title: "Export Coordinator", email: "mikkel@nordsea.dk", phone: "+45 87654321", country: "Denmark" },
  { id: "14", customerCode: "CL-0014", customer: "Alpine Logistics SA", contactperson: "Sophie Moreau", title: "Fleet Manager", email: "sophie@alpinelogistics.fr", phone: "+33 612345678", country: "France" },
  { id: "15", customerCode: "CL-0015", customer: "Baltic Packaging", contactperson: "Tomas Petrauskas", title: "Production Planner", email: "tomas@balticpack.lt", phone: "+370 61234567", country: "Lithuania" },
  { id: "16", customerCode: "CL-0016", customer: "ScandiMetal Oy", contactperson: "Anna Virtanen", title: "Finance Manager", email: "anna@scandimetal.fi", phone: "+358 501234567", country: "Finland" },
  { id: "17", customerCode: "CL-0017", customer: "TransNord AB", contactperson: "Jonas Lindberg", title: "Fleet Operations", email: "jonas@transnord.se", phone: "+46 701234567", country: "Sweden" },
  { id: "18", customerCode: "CL-0018", customer: "Continental Freight BV", contactperson: "Eva Janssen", title: "Supply Chain Analyst", email: "eva@continentalfreight.nl", phone: "+31 612345678", country: "Netherlands" },
  { id: "19", customerCode: "CL-0019", customer: "Nordic Trading House", contactperson: "Douglas MacLeod", title: "Procurement Specialist", email: "douglas@nordictrading.uk", phone: "+44 7712345678", country: "United Kingdom" },
  { id: "20", customerCode: "CL-0020", customer: "Adriatic Shipping SRL", contactperson: "Giulia Rossi", title: "Operations Coordinator", email: "giulia@adriaticshipping.it", phone: "+39 3312345678", country: "Italy" }
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
            <ClientList
              filteredClients={[{
                id: Number(selectedClient.id),
                name: selectedClient.customer,
                customer: selectedClient.customer,
                contactperson: selectedClient.contactperson
              }]}
            />
            <div className="m-12">
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
                <ClientList filteredClients={filteredClients.map(c => ({ id: Number(c.id), name: c.customer, customer: c.customer, contactperson: c.contactperson, title: c.title, email: c.email, phone: c.phone, country: c.country }))} />
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

  );
}