"use client";

import React from "react";

interface SearchItem {
  id: number;
  name: string;
  client: string;
}

export default function DetailView({ filteredItems }: { filteredItems: SearchItem[] }) {
  return (
    <section style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
      <h2>Søkeresultater:</h2>
      <ul>
        {filteredItems.map((item) => (
            <div key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red" }}>
              <h3 key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid red" }}>
            <strong>{item.name}</strong> — <span style={{ color: "#666" }}>{item.client}</span>
          </h3>
          <a href={`/Home`}><button>back</button></a>
            </div>
        ))}
      </ul>
    </section>
  );
}