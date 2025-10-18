"use client";

import React from "react";

interface SearchItem {
  id: number;
  name: string;
  customer: string;
    contactperson?: string;
}

export default function DetailView({ filteredItems }: { filteredItems: SearchItem[] }) {
  return (
    <section style={{ background: "#fff", padding: 16, borderRadius: 8, width: "50%" }}>
      <h2>Søkeresultater:</h2>
      <ul>
        {filteredItems.map((item) => (
            <div key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <h3 key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red" }}>{item.name}</h3>
              <p><span style={{ color: "#666" }}>{item.customer}</span></p>
              <p><span style={{ color: "#666" }}>{item.contactperson}</span></p>
          <a href={`/Home`}><button>back</button></a>
            </div>
        ))}
      </ul>
    </section>
  );
}