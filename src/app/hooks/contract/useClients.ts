"use client";

import { dummyClients } from "../../../lib/clientdummydata";

export function useClients() {
  return {
    clients: dummyClients,
  };
}
