"use client"

import React, { useState } from "react";
import type { Client } from "@/lib/clientdummydata";

interface NewClientProps {
  onCreate?: (client: Client) => void;
  onCancel?: () => void;
}

export default function NewClient({ onCreate, onCancel }: NewClientProps) {

const [customer, setCustomer] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [contactperson, setContactperson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [relation, setRelation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !customerCode.trim()) {
        setError("Customer and Customer Code are required.");
        return;
    } 
    setError(null);

    const partialClient: Omit<Client, "id"> = {
      customer,
      customerCode,
      contactperson,
      email,
      phone,
      country,
      title,
      relation,
    };

    console.log("Creating client:", partialClient);

    onCreate?.(partialClient as Client);
  }

  return (   <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg w-full">
        <h3 className="text-lg font-medium mb-4">New Client</h3>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <div className="grid grid-cols-1 gap-3">
          <input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Company name" className="border p-2 rounded" />
          <input value={customerCode} onChange={e => setCustomerCode(e.target.value)} placeholder="Client No" className="border p-2 rounded" />
          <input value={contactperson} onChange={e => setContactperson(e.target.value)} placeholder="Contact person" className="border p-2 rounded" />
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded" />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="border p-2 rounded" />
          <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" className="border p-2 rounded" />
          <input value={relation} onChange={e => setRelation(e.target.value)} placeholder="Relation" className="border p-2 rounded" />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] text-white rounded">Create</button>
        </div>
      </form>
    </div>)


}