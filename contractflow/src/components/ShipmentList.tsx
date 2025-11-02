"use client";

import DetailView from "@/app/pages/DetailView";
import React from "react";

interface SearchItem {
    id?: number;
  customer?: string;
  customerOrderNumber?: string;
  containerNumber?: string;
  product?: string;
  poEta?: string;
  etd?: string;
  invoiceNumber?: string;
  invoiceAmount?: string;
  bookingNumber?: string;
  blNumber?: string;
}

export default function ShipmentList({ filteredItems }: { filteredItems: SearchItem[] }) {
  return (
    <section className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight mb-4">Søkeresultater:</h2>
      <div className="mb-2">
        {filteredItems.map((item, idx) => (
          <DetailView key={item.id ?? idx} item={item} />
        ))}
      </div>
    </section>
  );
}

