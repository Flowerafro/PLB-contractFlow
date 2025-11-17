"use client";

import type { Client } from "../app/types/client";
import ButtonClear from "./ButtonClear";

export default function ClientProfilePage({
  client, onBack,
}: {
  client: Client;
  onBack?: () => void;
}) {

  const initials = client.name.split(" ").map(n => n[0]).join("");

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="flex flex-col items-center">

              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700 mb-4">
                {initials}
              </div>

              <h2 className="text-xl font-semibold mb-1">{client.name}</h2>

              <p className="text-gray-600 text-sm">
                Kunde-ID: {client.customerCode ?? "–"}
              </p>
            </div>

            <div className="border-t border-gray-200 my-6" />

            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">Opprettet</p>
                <p className="text-gray-800">{client.createdAt ?? "–"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Land</p>
                <p className="text-gray-800">{client.country ?? "–"}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="lg:col-span-2 space-y-6">
          <article className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Kontaktinformasjon</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <p className="text-sm text-gray-500 mb-1">E-post</p>
                <p className="text-gray-800">{client.email ?? "–"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Telefon</p>
                <p className="text-gray-800">{client.phone ?? "–"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="text-gray-800">{client.status}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Kunde-ID</p>
                <p className="text-gray-800">{client.customerCode ?? "–"}</p>
              </div>

            </div>
          </article>

          <div className="flex items-center gap-3">
          {/*   <button
              onClick={onBack}
              className="px-4 py-2 rounded text-white bg-green-700"
            >
              Tilbake
            </button> */}
            <ButtonClear onClick={onBack}>Tilbake</ButtonClear>
          </div>
        </section>

      </div>
    </section>
  )
}



/* 
export default function ClientProfilePage({
  client,
  onBack,
}: {
  client: Client;
  onBack?: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-[var(--text-color-gray-dark)] mb-4">
                {client.contactperson?.split(" ").map((n) => n[0]).join("")}
              </div>

              <h2 className="text-xl font-semibold mb-1">{client.customer}</h2>
              <p className="text-[var(--text-color-gray)]-600 mb-2">{client.relation}</p>
              <p className="text-[var(--text-color-gray-dark)] text-sm">Kunde-ID: {client.customerCode}</p>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">Klient siden:</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.clientAdded}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">Land</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.country}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <article className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Kontaktinformasjon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">E-post</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.email}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">Telefon</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">Kunde-ID</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.customerCode}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-color-gray)] mb-1">Land</p>
                <p className="text-[var(--text-color-gray-dark)]">{client.country}</p>
              </div>
            </div>
          </article>

          <div className="flex items-center gap-3">
            <button onClick={onBack} className="px-4 py-2 rounded text-white bg-[var(--primary-color)]">Tilbake</button>
          </div>
        </div>
      </div>
    </div>
  );
} */