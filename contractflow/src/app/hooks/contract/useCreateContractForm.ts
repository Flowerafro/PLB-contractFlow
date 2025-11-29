"use client";

import { useContractAPI } from "@/app/hooks/contract/useContractAPI";
import { useContractNavigation } from "@/app/hooks/contract/useContractNavigation";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contractSchema = z.object({
  client: z.string().min(1, "Choose a client"), 
  contractName: z.string().optional(),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
  startDate: z.string().optional(),
  stopDate: z.string().optional(),
  terms: z.string().optional(),
});


export type ContractForm = z.infer<typeof contractSchema>;

export function useCreateContractForm() {
  const api = useContractAPI();
  const navigate = useContractNavigation();

  const form = useForm<ContractForm>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      client: "",
      contractName: "",
      clientName: "",
      clientEmail: "",
      startDate: "",
      stopDate: "",
      terms: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await api.createContract({
        plbReference: data.contractName || "PLB-" + Date.now(),
        clientId: 1,
        principalId: null,
        productCode: data.client,
        orderDate: data.startDate,
        status: "ACTIVE",
      });
    } catch (error) {
      console.warn("API call failed, continuing anyway");
    }
  
    navigate.goToSuccess();
  });
  

  return {
    ...form,
    onSubmit,
  };
}
