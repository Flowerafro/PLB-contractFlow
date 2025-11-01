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
    <section style={{ background: "#fff", padding: 16, borderRadius: 8, width: "100%" }}>
      <h2>Søkeresultater:</h2>
      <div className="flex flex-col gap-4">
        {filteredItems.map((item) => (
          <article key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color]">
              <div className="flex flex-col items-left pb-10">
                <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray-dark)] dark:text-white">{item.customer}</h5>
                <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{item.name}</p>
                <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{item.contactperson}</p>
            </div>
        </article>
        ))}
      </div>
    </section>

  );
}