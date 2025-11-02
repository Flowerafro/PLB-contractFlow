"use client";

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

export default function DetailView({ item }: { item: SearchItem }) {

    const customer = item.customer ?? "Ukjent";
    const customerOrder = item.customerOrderNumber ?? "Ukjent";
    const container = item.containerNumber ?? "Ukjent";
    const product = item.product ?? "Ukjent";
    const poEta = item.poEta ?? "Ukjent";
    const etd = item.etd ?? "Ukjent";
    const invoiceNo = item.invoiceNumber ?? "Ukjent"; 
    const invoiceAmount = item.invoiceAmount ?? "Ukjent";
    const booking = item.bookingNumber ?? "Ukjent";
    const blNumber = item.blNumber ?? "Ukjent";

  
  return (
    <article className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color] p-4">
      <div className="flex flex-col items-left pb-4">
        <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray)] dark:text-black">Klient: {customer} No.: {customerOrder}</h5>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Container: {container}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Product: {product}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">ETA: {poEta} ETD: {etd}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Invoice No.: {invoiceNo} Amount: {invoiceAmount}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Booking No.: {booking}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">BL No.: {blNumber}</p>
      </div>
    </article>
  );
}