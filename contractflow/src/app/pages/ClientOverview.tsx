"use client";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";


interface ClientOverviewProps {
    onClientClick?: (id: string) => void;
    onNewClient?: () => void;
}

export default function ClientOverview( {onClientClick, onNewClient}: ClientOverviewProps) {
    const [searchClient, setSearchClient] = useState("");
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const [hoveredClientId, setHoveredClientId] = useState<string | null>(null);

    // dummy data for clients
    const dummyClients = [
        { id: '1', clientNo: 'CL-001', customer: 'Nordic Supplies AS', contactperson: 'Lars Hansen', title: "Project Manager", email: 'lars@nordicsupplies.no', phone: '+47 98765432', country: 'Norway' },
        { id: '2', clientNo: 'CL-002', customer: 'Baltic Traders', contactperson: 'Anna Kowalski', title: "Sales Representative", email: 'anna@baltictraders.pl', phone: '+48 123456789', country: 'Poland' },
        { id: '3', clientNo: 'CL-003', customer: 'Scandinavian Woods', contactperson: 'Erik Svensson', title: "Logistics Manager", email: 'erik@scandwoods.se', phone: '+46 987654321', country: 'Sweden' },
        { id: '4', clientNo: 'CL-004', customer: 'Euro Forest Ltd', contactperson: 'Maria Schmidt', title: "Logistics Manager", email: 'maria@euroforest.de', phone: '+49 234567890', country: 'Germany' },
        { id: '5', clientNo: 'CL-005', customer: 'Alpine Wood Co', contactperson: 'Jean Dupont', title: "Product Designer", email: 'jean@alpinewood.fr', phone: '+33 345678901', country: 'France' },
        { id: '6', clientNo: 'CL-006', customer: 'Nordic Timber Group', contactperson: 'Olaf Jansen', title: "Quality Assurance", email: 'olaf@nordictimber.fi', phone: '+358 456789012', country: 'Finland' },
        { id: '7', clientNo: 'CL-007', customer: 'Baltic Wood Exports', contactperson: 'Anna Kowalski', title: "Sales Representative", email: 'anna@balticwood.pl', phone: '+48 234567890', country: 'Poland' },
        { id: '8', clientNo: 'CL-008', customer: 'Nordic Trading House', contactperson: 'Lars Hansen', title: "HR Specialist", email: 'lars@nordictrading.no', phone: '+47 87654321', country: 'Norway' },
    ]


    // søkefunksjon for klienter
    const handleSearch = (query: string) => {
        setSearchClient(query);
        const trimmedClient = query.trim().toLowerCase();
        
        if (!trimmedClient) {
            setFilteredClients([]);
            return;
        }

        const clientResults = dummyClients.filter(client => 
            client.clientNo.toLowerCase().includes(trimmedClient) || 
            client.customer.toLowerCase().includes(trimmedClient) || 
            client.contactperson.toLowerCase().includes(trimmedClient)
    );
        setFilteredClients(clientResults);
    }

    const clientDisplay = searchClient ? filteredClients.length > 0 ? filteredClients : [] : dummyClients;

    return (
      <section className="space-y-6">
      <div className="flex flex-row">
        <h2 className="m-0" style={{ color: '#000' }}>Clients Overview</h2>
        <button  style={{ backgroundColor: '#1D391D', color: '#fff', padding: '8px 16px', borderRadius: '4px' }} onClick={onNewClient}>
          + New Client
        </button>
      </div>

      {/* Search Component - Queries: Contact Person, Company Name */}
      <div>
       <SearchBar
          placeholder="Search by Client No, Company Name or Contact Person..."
          onSearch={handleSearch}
        />
      </div>

      {searchClient && clientDisplay.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {clientDisplay.map(client => (
              <li key={client.id}>{client.customer} - {client.contactperson}</li>
            ))}
          </ul>
        </div>
      )}

      {searchClient && clientDisplay.length === 0 && (
        <div>No clients found for "{searchClient}"</div>
      )}

      {/* Clients Table - Click row to open Client Detail View */}
      <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/10" style={{ backgroundColor: '#f8f8f8' }}>
          <h3 className="m-0" style={{ color: '#1E1E1E' }}>
            Customer Register
          </h3>
          <p className="m-0 mt-1 opacity-60">Click any row to view detailed client information</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <thead style={{ background: "#f7f7f7", borderBottom: "2px solid #ddd", fontSize: 16, color: "#000", fontFamily: "Arial, sans-serif" }}>
             <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Client No</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Company Name</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Contact Person</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Email</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Phone</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Country</th>
                </tr>
            </thead>
          <tbody style={{ fontSize: 14, color: "#333", fontFamily: "Arial, sans-serif" }}>
            {clientDisplay.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => onClientClick?.(client.id)}
                  onMouseEnter={() => setHoveredClientId(client.id)}
                  onMouseLeave={() => setHoveredClientId(null)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: hoveredClientId === client.id ? '#f0f0f0' : undefined,
                    transition: 'background-color 0.3s'
                  }}
                >
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.clientNo}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.customer}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.contactperson}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.email}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.phone}</td>
                    <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{client.country}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
    )
}