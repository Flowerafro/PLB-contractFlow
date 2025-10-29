"use client";

import ClientCard from "./ClientCard";
import type { ComponentType } from "react";


interface ClientSearchItem {
 id: number;
 name: string;
 customer: string;
 contactperson?: string;
   title?: string;
 email?: string;
 phone?: string;
 country?: string;
}


export default function ClientList({ filteredClients }: { filteredClients: ClientSearchItem[] }) {
  return (
   <section className="">
      <h2>Søkeresultater:</h2>
      <div>
         <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredClients.map((client) => (
               <ClientCard key={client.id} client={client} />
            ))}
         </section>
      </div>
    </section> 
)}

/*  <section style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10}}> */