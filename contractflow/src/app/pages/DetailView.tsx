"use client";

import React from "react";

interface SearchItem {
  id?: number;
  name?: string;
  customer?: string;
  contactperson?: string;
}

export default function DetailView({ item }: { item: SearchItem }) {
  return (
    <article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color] p-4 mb-4">
      <div className="flex flex-col items-left pb-4">
        <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray)] dark:text-black">Klient: {item.customer}</h5>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Navn: {item.name}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Kontaktperson: {item.contactperson}</p>
      </div>
    </article>
  );
}