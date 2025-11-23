"use client";

/* import type { Client } from "../../app/types/client"; */
import type { Client } from "../../lib/clientdummydata";
import ButtonClear from "../ButtonClear";

export default function ClientProfilePage({
  client, onBack,
}: {
  client: Client;
  onBack?: () => void;
}) {

  const initials = client?.customer?.split(" ").map(n => n[0]).join("");

  return (
    <section className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="flex flex-col items-center">

              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700 mb-4">
                {initials}
              </div>

              <h2 className="text-xl font-semibold mb-1">{client.customer}</h2>

              <p className="text-gray-600 text-sm">
                Kunde-ID: {client.customerCode ?? "–"}
              </p>
            </div>

            <div className="border-t border-gray-200 my-6" />

            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">Opprettet</p>
                <p className="text-gray-800">{client.clientAdded ?? "–"}</p>
              </div>

                <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                {client.status === "Active" ? (
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                ) : client.status === "Inactive" ? (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-gray-800 rounded-full">Inactive</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
            <ButtonClear onClick={onBack}>Tilbake</ButtonClear>
          </div>
          <article className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Kontaktinformasjon</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

               <div>
                <p className="text-sm text-gray-500 mb-1">Kunde-ID</p>
                <p className="text-gray-800 font-bold">{client.customerCode ?? "–"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">E-post</p>
                <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">{client.email ?? "–"}</a>
              </div>

               <div>
                <p className="text-sm text-gray-500 mb-1">Land</p>
                <p className="text-gray-800">{client.country ?? "–"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Telefon</p>
                <p className="text-gray-800">{client.phone ?? "–"}</p>
              </div>
            </div>
          </article>
        </section>

      </div>
    </section>
  )
}

