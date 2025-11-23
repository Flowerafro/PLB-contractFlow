"use client";

/* import type { ClientSearchItem } from "../../app/types/clientSearch"; */
import type { Client } from "../../lib/clientdummydata";

import useHoverEffect from "@/app/hooks/useHoverEffect";




export default function ClientCard({
  client,
  onSelect
}: {
  client: Client;
  onSelect?: (client: Client) => void;
}) {


  const { hoverEffect, onHover, onLeave } = useHoverEffect<string>();
  const initials = client?.customer?.split(" ").map(n => n[0]).join("");

  return (
    <article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className={`flex flex-col items-center cursor-pointer pb-10 pt-6 px-4 ${hoverEffect === client.id ? "bg-gray-100" : ""}`} onClick={() => onSelect?.(client)}  onMouseEnter={() => onHover(client.id)} onMouseLeave={() => onLeave()}>

       <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700 mb-4">
          {initials}
        </div>

        <h5 className="mb-2 text-xl font-bold text-gray-800">
          {client.customer}
        </h5>

        {client.email && (
          <p className=" mb-2 text-sm text-gray-600">{client.email}</p>
        )}
 
        {client.phone && (
          <p className=" mb-2 text-sm text-gray-600">{client.phone}</p>
        )}

        {client.country && (
          <p className="mb-2 text-sm text-gray-600">{client.country}</p>
        )}

        {client.customerCode && (
          <p className="mb-2 text-sm text-gray-600">Code: {client.customerCode}</p>
        )}

        <div className="flex mt-4">
        {client.status === "Active" ? (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
        ) : client.status === "Inactive" ? (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-gray-800 rounded-full">Inactive</span>
        ) : null
        }
        </div>
      </div>
    </article>
  );
}
