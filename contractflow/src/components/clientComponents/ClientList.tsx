"use client";

import ClientCard from "./ClientCard";
import type { Client } from "../../lib/clientdummydata";

export default function ClientList({
  filteredClients,
  onSelectClient,
}: {
  filteredClients: Client[];
  onSelectClient?: (client: Client) => void;
}) {
  return (
    <section className="p-4">
      <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight">Søkeresultater</h2>
      <div>
        <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onSelect={onSelectClient}
            />
          ))}
        </section>
      </div>
    </section>
  );
}