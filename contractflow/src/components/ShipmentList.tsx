"use client";

import DetailView from "@/app/pages/DetailView";
import React from "react";

interface SearchItem {
  id: number;
  name: string;
  customer: string;
  contactperson?: string;
}

export default function ShipmentList({ filteredItems }: { filteredItems: SearchItem[] }) {
  return (
    <section style={{ background: "#fff", padding: 16, borderRadius: 8, width: "50%" }}>
      <h2>Søkeresultater:</h2>
      <div >
        {filteredItems.map((item) => (
            <DetailView key={item.id} filteredItems={[item]} />
        ))}
      </div>
    </section>
  );
}