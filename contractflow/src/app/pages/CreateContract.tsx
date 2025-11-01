"use client";
import React, { useState, JSX } from "react";

/**
 * ContractForm – representerer alle feltverdier i kontraktskjemaet.
 */
type ContractForm = {
  client: string;
  contractName: string;
  clientName: string;
  clientEmail: string;
  startDate: string;
  stopDate: string;
  terms: string;
};

/**
 * CreateContractPage
 * Viser et skjema for å opprette en ny kontrakt.
 * Når skjemaet sendes inn, blir data sendt til backend-funksjonen "contracts".
 */
export default function CreateContractPage(): JSX.Element {
  // State for skjemaets felt
  const [form, setForm] = useState<ContractForm>({
    client: "",
    contractName: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    stopDate: "",
    terms: "",
  });

  // State for lastestatus og tilbakemelding til brukeren
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * handleSubmit – håndterer innsending av skjema.
   * Sender data til backend for lagring i databasen.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/.redwood/functions/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plbReference: form.contractName || "PLB-" + Date.now(),
          clientId: 1,
          principalId: null,
          productCode: form.client,
          orderDate: form.startDate,
          tonnPerFcl: null,
          priceUsdPerMtC: 0,
          totalUsdC: 0,
          commissionGroupBp: null,
          customerOrderNo: null,
          principalContractNo: null,
          principalContractDate: null,
          principalOrderNo: null,
          status: "ACTIVE",
        }),
      });

      if (!res.ok) throw new Error("Failed to save contract");
      setMessage("Contract successfully created");
      window.location.href = "/success";
    } catch (error) {
      console.error(error);
      setMessage("Error creating contract");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-300 py-10">
      {/* Hvit boks som inneholder hele kontraktskjemaet */}
      <div className="bg-white rounded-xl shadow-md p-12 w-full max-w-md">
        {/* Overskrift for siden */}
        <h1 className="text-center text-2xl font-bold mb-8">Create contract</h1>

        {/* Skjema for kontraktsinformasjon */}
        <form onSubmit={handleSubmit} className="grid gap-5">
          
          {/* Klientvalg (dropdown) */}
          <div>
            <label className="block font-medium mb-1">Choose client</label>
            <select
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              <option value="">----</option>
              <option value="plb">PLB Consulting</option>
              <option value="nordic">Nordic Shipping</option>
            </select>
          </div>

          {/* Kontraktnavn */}
          <div>
            <label className="block font-medium mb-1">Contract name</label>
            <input
              type="text"
              placeholder="Shipping contract with"
              value={form.contractName}
              onChange={(e) =>
                setForm({ ...form, contractName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          {/* Klientens navn */}
          <div>
            <label className="block font-medium mb-1">Client name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.clientName}
              onChange={(e) =>
                setForm({ ...form, clientName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          {/* Klientens e-postadresse */}
          <div>
            <label className="block font-medium mb-1">Client email</label>
            <input
              type="email"
              placeholder="name@email.com"
              value={form.clientEmail}
              onChange={(e) =>
                setForm({ ...form, clientEmail: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          {/* Start- og stoppdato */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Start date</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">Stop date</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={form.stopDate}
                onChange={(e) =>
                  setForm({ ...form, stopDate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
          </div>

          {/* Vilkår og betingelser */}
          <div>
            <label className="block font-semibold mb-1">
              Terms and conditions
            </label>
            <textarea
              placeholder="Enter text here.."
              value={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.value })}
              className="w-full h-40 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-900"
            />
          </div>

          {/* Send-knapp */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-900 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-900"
          >
            {loading ? "Saving..." : "Create contract"}
          </button>

          {/* Statusmelding som gir brukeren tilbakemelding etter innsending */}
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
