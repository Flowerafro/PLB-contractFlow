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
      <div className="flex flex-col gap-4 p-">
        {filteredItems.map((item) => (
          <article key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color] p-4">
              <div className="flex flex-col items-left pb-10">
                <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray)] dark:text-black">{item.customer}</h5>
                <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{item.name}</p>
                <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{item.contactperson}</p>
            </div>
        </article>
        ))}
      </div>
  );
}