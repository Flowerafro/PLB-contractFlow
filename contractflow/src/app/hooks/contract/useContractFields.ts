"use client";

export function useContractFields() {
  return [
    { name: "contractName", label: "Contract name", type: "text" },
    { name: "clientName", label: "Client name", type: "text" },
    { name: "clientEmail", label: "Client email", type: "email" },
  ] as const;
}
