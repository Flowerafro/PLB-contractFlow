"use client";
import React from "react";
import Layout from "./Layout";

/**
 * ContractSuccess
 * Denne komponenten representerer bekreftelsessiden som vises etter at en kontrakt er opprettet.
 * Brukeren får en visuell bekreftelse på at handlingen var vellykket, sammen med to handlingsknapper:
 * én for å gå tilbake og opprette en ny kontrakt, og én for å laste ned kontrakten.
 */
export default function ContractSuccess() {
  return (
    <Layout>
      {/* Hovedområde for innholdet på siden */}
      <main className="min-h-screen flex items-center justify-center bg-gray-300">
        
        {/* Kortet som inneholder bekreftelsesinnholdet */}
        <article
          className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm text-center border border-blue-400"
          aria-labelledby="contract-success-heading"
        >
          {/* Grønn sirkel med et hvitt check-ikon i midten.
              Symboliserer at opprettelsen av kontrakten var vellykket. */}
          <figure
            className="bg-[#6DA76D] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </figure>

          {/* Overskrift som beskriver statusen på handlingen */}
          <h1
            id="contract-success-heading"
            className="text-lg font-medium text-gray-800 mb-8"
          >
            Contract added successfully!
          </h1>

          {/* Seksjon for de to knappene som gir brukeren neste valg */}
          <div className="flex flex-col gap-4 items-center">
            
            {/* Knapp som sender brukeren tilbake til kontraktsopprettelsessiden */}
            <button
              onClick={() => (window.location.href = "/create")}
              className="bg-green-900 text-white py-2 px-6 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              Go back
            </button>

            {/* Knapp som lar brukeren laste ned kontrakten.
                Foreløpig viser den kun en melding, men kan senere kobles til et faktisk dokument. */}
            <button
              type="button"
              onClick={() => alert("Downloading contract...")}
              className="border border-dashed border-green-900 text-green-900 rounded-md px-4 py-2 text-sm font-medium hover:bg-green-50 transition"
            >
              Download contract
            </button>
          </div>
        </article>
      </main>
    </Layout>
  );
}
