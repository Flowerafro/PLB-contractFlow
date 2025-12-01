"use client";

export function useContractFields() {
  return [
    { name: "plbReference", label: "PLB reference", type: "text" },
    { name: "clientName", label: "Client name", type: "text" },
    { name: "clientEmail", label: "Client email", type: "email" },
  ] as const;
}
