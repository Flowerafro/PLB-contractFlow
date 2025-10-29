"use client";

import type { Client } from "@/lib/clientdummydata";

export default function ClientProfile({
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
              <p className="text-[var(--text-color-gray)]-600 mb-2">{client.title}</p>
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

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Lignende klienter</h3>
            <div className="space-y-3">
              {[
                { name: "Marta Nilsson" },
                { name: "Jonas Ek" },
                { name: "Sofia Berg" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[var(--text-color-gray)] font-semibold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <p className="text-sm text-[var(--text-color-gray-dark)]">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
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
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onBack} className="px-4 py-2 rounded text-white bg-[var(--primary-color)]">Tilbake</button>
          </div>
        </div>
      </div>
    </div>
  );
}