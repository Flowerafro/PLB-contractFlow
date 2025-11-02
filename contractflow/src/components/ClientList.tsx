"use client";

import ClientCard from "./ClientCard";
import type { ClientSearchItem } from "@/types/clientview";


export default function ClientList({
  filteredClients,
  onSelectClient,
}: {
  filteredClients: ClientSearchItem[];
  onSelectClient?: (client: ClientSearchItem) => void;
}) {
  return (
    <section className="">
      <h2>Søkeresultater:</h2>
      <div>
        <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredClients.map(client => (
            <ClientCard key={client.id} client={client} onSelect={onSelectClient} />
          ))}
        </section>
      </div>
    </section>
  );
}
