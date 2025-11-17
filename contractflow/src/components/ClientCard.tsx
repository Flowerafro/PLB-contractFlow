"use client";

import type { ClientSearchItem } from "../app/types/clientSearch";

export default function ClientCard({
  client,
  onSelect
}: {
  client: ClientSearchItem;
  onSelect?: (client: ClientSearchItem) => void;
}) {
  return (
    <article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center pb-10 pt-6 px-4">

        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-200"
          src="#"
          alt="profile"
        />

        <h5 className="mb-1 text-xl font-medium text-gray-800">
          {client.name}
        </h5>

        {client.email && (
          <p className="text-sm text-gray-600">{client.email}</p>
        )}

        {client.phone && (
          <p className="text-sm text-gray-600">{client.phone}</p>
        )}

        {client.country && (
          <p className="text-sm text-gray-600">{client.country}</p>
        )}

        {client.customerCode && (
          <p className="text-sm text-gray-600">Code: {client.customerCode}</p>
        )}

        <div className="flex mt-4">
          <button
            onClick={() => onSelect?.(client)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg"
          >
            Open
          </button>
        </div>
      </div>
    </article>
  );
}
