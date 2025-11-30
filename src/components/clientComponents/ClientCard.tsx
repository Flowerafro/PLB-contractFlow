"use client";

import useHoverEffect from "@/app/hooks/useHoverEffect";
import type { DBClient } from "@/db/schema/schema";

export default function ClientCard({
  client,
  onSelect
}: {
  client: DBClient;
  onSelect?: (client: DBClient) => void;
}) {


  const { hoverEffect, onHover, onLeave } = useHoverEffect<number>();
  const initials = client?.name?.split(" ").map(n => n[0]).join("");

  return (
    <article className={`w-full max-w-sm border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors ${hoverEffect === client.id ? "bg-gray-100" : "bg-white"}`} onMouseEnter={() => onHover(client.id)} onMouseLeave={() => onLeave()} onClick={() => onSelect?.(client)}>
      <div className="flex flex-col items-center pb-10 pt-6">
       <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700 mb-4">
          {initials}
        </div>

        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {client.name}
          </h3>

          <ul className="list-none p-0 ml-2">
            <li className=" mb-2 text-sm text-gray-600">{client.email}</li>
            <li className=" mb-2 text-sm text-gray-600">{client.phone}</li>
            <li className=" mb-2 text-sm text-gray-600">{client.country}</li>
            <li className=" mb-2 text-sm text-gray-600">{client.customerCode}</li>
          </ul>

          <div className="flex mt-4">
          {client.status === "ACTIVE" ? (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
          ) : client.status === "INACTIVE" ? (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>
          ) : null
          }
          </div>
        </div>
      </div>
    </article>
  );
}