"use client";


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




export default function ClientDetailView({ filteredClients }: { filteredClients: ClientSearchItem[] }) {
 return (
  <section className="bg-white p-4 rounded-md">
     <h2 className="text-lg font-semibold mb-4">Søkeresultater:</h2>
     <div>
       <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {filteredClients.map((client) => (
           <article
             key={client.id}
             className="bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
           >
             <div>
               <h3 className="text-md font-semibold text-gray-900">
                 {client.customer ?? client.name ?? "Ukjent kunde"}
               </h3>
               <p className="text-sm text-gray-600">{client.title ?? "Ingen tittel"}</p>
               <p className="mt-2 text-sm text-gray-700">{client.contactperson ?? "Ingen kontaktperson"}</p>
             </div>


             <div className="mt-4 border-t pt-3 flex flex-col gap-1">
               <a className="text-sm text-blue-600" href={`mailto:${client.email ?? ""}`}>
                 {client.email ?? "Ingen epost"}
               </a>
               <p className="text-sm text-gray-700">{client.phone ?? "Ingen telefon"}</p>
               <p className="text-sm text-gray-500">{client.country ?? "Ukjent land"}</p>
             </div>
           </article>
         ))}
       </section>
     </div>
   </section>
)}
