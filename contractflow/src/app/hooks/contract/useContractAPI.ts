"use client";

import { contractAPI } from "../../../lib/contractAPI";

export function useContractAPI() {
  async function createContract(payload: any) {
    return await contractAPI.create(payload);
  }

  return { createContract };
}

