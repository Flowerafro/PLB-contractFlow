"use client";

import React, { useState } from "react"; 
import Layout from "./Layout";

/**
 * ContractTerms – side 2 i kontraktflyten.
 * Denne siden lar brukeren skrive inn kontraktens vilkår før den opprettes.
 * Når skjemaet sendes inn, går man videre til neste steg.
 */
export default function ContractTerms() {
  // useState hook brukes til å holde styr på innholdet i tekstfeltet (terms).
  // Verdien oppdateres hver gang brukeren skriver i textarea.
  const [terms, setTerms] = useState("");

  /**
   * handleSubmit – funksjonen som håndterer innsending av skjemaet.
   * Stopper nettleserens standard oppførsel (reload).
   * Logger teksten og viser midlertidig melding (alert).
   * Senere kan denne funksjonen kalles mot RedwoodSDK for å lagre kontrakten.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stopper siden fra å oppdatere.
    console.log("Terms submitted:", terms); // Logger verdien i konsollen for testing.

    // Midlertidig feedback og senere kan dette byttes ut med redirect til /success.
    alert("Contract created successfully!");
  };

  // JSX strukturen som beskriver hvordan komponenten skal vises i nettleseren.
  return (
    <Layout>
      {/* Seksjon som sentrerer kontraktsskjemaet vertikalt og horisontalt */}
      <section
        style={{
          minHeight: "calc(100vh - 80px)", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D9D9D9", 
          padding: "40px 0",
        }}
      >
        {/* Hvit boks som inneholder skjemaet */}
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
          {/* Overskrift */}
          <h1 style={{ textAlign: "center", marginBottom: 32 }}>
            Create new contract
          </h1>

          {/* Skjemaet */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 24 }} 
          >
            {/* Tekstfelt for vilkår */}
            <div>
              <label style={{ fontWeight: 600 }}>Terms and conditions</label>

              {/* Textarea for å skrive kontraktens vilkår */}
              <textarea
                placeholder="Enter text here.." // Hinttekst
                value={terms} // Knyttet til useState (kontrollert komponent)
                onChange={(e) => setTerms(e.target.value)} // Oppdaterer state ved input
                style={{
                  width: "100%",
                  height: 220,
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  resize: "none", 
                }}
              />
            </div>

            {/* Send-knappen */}
            <button
              type="submit"
              style={{
                backgroundColor: "#1D391D", 
                color: "white",
                padding: 12,
                border: "none",
                borderRadius: 6,
                cursor: "pointer", 
              }}
            >
              Create contract
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
