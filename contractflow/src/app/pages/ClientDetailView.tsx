"use client";

import React from "react";
import { index } from "rwsdk/router";

interface ClientSearchItem {
  id: number;
  name: string;
  customer: string;
  contactperson?: string;
    title?: string;
  email?: string;
  phone?: string;
  country?: string;
}

const dummyContracts = [
    {
        contractNumber: "12345",
        orderNo: 1,
        details: "Contract details for contract 12345..."
    },
    {
        contractNumber: "67890",
        orderNo: 2,
        details: "Contract details for contract 67890..."
    }
]

export default function ClientDetailView({ filteredClients }: { filteredClients: ClientSearchItem[] }) {
  return (
   <section style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
      <h2>Søkeresultater:</h2>
      <div>
         <section style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10}}>
        {filteredClients.map((client) => (
                <article  style={{ gridColumn:"1 / 2", padding: "8px 0", border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "space-between", gap: 10 }}>
                    <h3 style={{ padding: "8px 0", color: "#000" }}>{client.customer}</h3>
                    <p style={{color: "#000"}}>{client.country}</p>
                    <ul>
                        <li>{client.contactperson}</li>
                        <li>{client.title}</li>
                        <li>{client.email}</li>
                        <li>{client.phone}</li>
                        <li>{client.country}</li>
                    </ul>
                    <p><span style={{ color: "#000" }}>{client.contactperson}</span></p>
                </article>           
        ))}
        {dummyContracts.map((contract) => (
                <article key={contract.orderNo} style={{ gridColumn: "1 / 2", marginTop: 12, padding: 16, border: "1px solid #ccc", borderRadius: 6 }}>
                    <h4 style={{ margin: 0, marginBottom: 8, color: "#000" }}>Contract No: {contract.contractNumber}</h4>
                    <p style={{ margin: 0, color: "#000" }}>{contract.details}</p>
                </article>
        ))}

         </section>
      </div>
    </section> 
)}