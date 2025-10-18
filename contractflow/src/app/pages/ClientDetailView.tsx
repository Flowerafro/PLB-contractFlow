"use client";

import React from "react";

interface ClientSearchItem {
  id: number;
  name: string;
  customer: string;
  contactperson?: string;
}

export default function ClientDetailView({ filteredClients }: { filteredClients: ClientSearchItem[] }) {
  return (
    <section style={{ background: "#fff", padding: 16, borderRadius: 8, width: "50%" }}>
      <h2>Søkeresultater:</h2>
      <ul>
        {filteredClients.map((item) => (
            <div key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <h3 key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red", color: "#000" }}>{item.name}</h3>
              <p><span style={{ color: "#000" }}>{item.customer}</span></p>
              <p><span style={{ color: "#000" }}>{item.contactperson}</span></p>
          <a href={`/Clients`}><button>back</button></a>
            </div>
        ))}
      </ul>
    </section>
  );
}