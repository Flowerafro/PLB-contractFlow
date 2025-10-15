"use client";
import React, { useState } from "react";
import Layout from "./Layout";

/**
 * CreateContract er en side der brukeren kan opprette en ny kontrakt.
 * Skjemaet inneholder felter for klient, kontraktnavn, e-post, og datoer.
 */
export default function CreateContract() {
  // useState brukes til å lagre alle verdier fra skjemaet i ett objekt.
  const [form, setForm] = useState({
    client: "",
    contractName: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    stopDate: "",
  });

  /**
   * handleSubmit håndterer innsending av skjemaet.
   * Stopper standard oppførsel og logger dataene.
   * Her kan vi senere legge til API-kall via RedwoodSDK for å lagre kontrakten.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    window.location.href = "/terms";

  };

  return (
    <Layout>
      {/* Seksjon som inneholder hele skjemaet */}
      <section
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E5E5E5",
          padding: "40px 0",
        }}
      >
        {/* Selve boksen med kontraktskjemaet */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)", 
            padding: 48,
            width: "100%",
            maxWidth: 480,
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: 32 }}>
            Create contract
          </h1>

          {/* Skjemaet */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 16 }}
          >
            {/* Klientvalg dropdown-liste */}
            <div>
              <label>Choose client</label>
              <select
                value={form.client}
                onChange={(e) =>
                  setForm({ ...form, client: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              >
                <option value="">----</option>
                <option value="plb">PLB Consulting</option>
                <option value="nordic">Nordic Shipping</option>
              </select>
            </div>

            {/* Kontraktnavn */}
            <div>
              <label>Contract name</label>
              <input
                type="text"
                placeholder="Shipping contract with"
                value={form.contractName}
                onChange={(e) =>
                  setForm({ ...form, contractName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Klientnavn */}
            <div>
              <label>Client name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Klientens e-postadresse */}
            <div>
              <label>Client email</label>
              <input
                type="email"
                placeholder="name@email.com"
                value={form.clientEmail}
                onChange={(e) =>
                  setForm({ ...form, clientEmail: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Start- og sluttdatoer for kontrakten */}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Start date (DD/MM/YY)"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                style={{
                  width: "50%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
              <input
                type="text"
                placeholder="Stop date (DD/MM/YY)"
                value={form.stopDate}
                onChange={(e) =>
                  setForm({ ...form, stopDate: e.target.value })
                }
                style={{
                  width: "50%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Filopplasting (foreløpig bare visuell) */}
            <div
              style={{
                border: "1px dashed #1D391D",
                borderRadius: 8,
                padding: 16,
                textAlign: "center",
                color: "#1D391D",
                cursor: "pointer",
              }}
            >
              Upload document
            </div>

            {/* Send-knapp */}
            <button
              type="submit"
              style={{
                backgroundColor: "#1D391D",
                color: "white",
                padding: 10,
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
