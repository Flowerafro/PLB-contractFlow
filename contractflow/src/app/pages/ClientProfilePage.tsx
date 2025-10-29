"use client";

import { useEffect, useState } from "react";
import { getClientById, type Client } from "@/lib/clientdummydata";

export default function ClientProfilePage({ clientId }: { clientId?: string }) {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!clientId) return;
    setClient(getClientById(clientId));
  }, [clientId]);

  if (!client) return <div className="p-6">Fant ikke klienten.</div>;

  return (
    <section className="p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-2">{client.customer}</h1>
      <div className="space-y-2">
        <div><strong>Email:</strong> {client.email}</div>
        <div><strong>Phone:</strong> {client.phone}</div>
        <div><strong>Country:</strong> {client.country}</div>
        <div><strong>Contact:</strong> {client.contactperson}</div>
      </div>
    </section>
  );
}