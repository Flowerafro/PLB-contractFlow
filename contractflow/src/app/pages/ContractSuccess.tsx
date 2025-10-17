"use client";
import React from "react";
import Layout from "./Layout";

/**
 * ContractSuccess er trinn 3 i kontraktflyten.
 * Denne siden vises etter at en kontrakt er opprettet.
 * Den gir brukeren bekreftelse og tre handlingsvalg: View, New, Export.
 */
export default function ContractSuccess() {
  return (
    <Layout>
      <main
        style={{
          minHeight: "720px", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D9D9D9",
        }}
      >
        {/* <article> representerer kontraktbekreftelsen */}
        <article
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            padding: 48,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
          }}
          aria-labelledby="contract-success-heading"
        >
          {/* Grønt check-ikon i en rund bakgrunn som symboliserer suksess */}
          <figure
            style={{
              backgroundColor: "#6DA76D",
              borderRadius: "50%",
              width: 80,
              height: 80,
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </figure>

          {/* Overskrift for siden */}
          <h1 id="contract-success-heading" style={{ marginBottom: 24 }}>
            Contract added successfully!
          </h1>

          <nav
            aria-label="Contract actions"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 16,
            }}
          >
            {/* Knapp for å vise eksisterende kontraktoversikt */}
            <button
              style={buttonStyle}
              onClick={() => (window.location.href = "/Home")}
            >
              View
            </button>

            {/* Knapp for å starte en ny kontrakt */}
            <button
              style={buttonStyle}
              onClick={() => (window.location.href = "/create")}
            >
              New
            </button>

            {/* Knapp for eksport foreløpig bare alert */}
            <button
              style={buttonStyle}
              onClick={() => alert("Exporting contract...")}
            >
              Export
            </button>
          </nav>
        </article>
      </main>
    </Layout>
  );
}

/**
 * buttonStyle – felles stil for knappene nederst på siden.
 * Gjenbrukes av alle tre knappene for konsistent design.
 */
const buttonStyle: React.CSSProperties = {
  backgroundColor: "#1D391D",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
