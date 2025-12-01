"use client";

import { contractAPI } from "@/server/databaseDataRetrieval/utilizations/contractAPI";
import { useContractNavigation } from "@/app/hooks/contract/useContractNavigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contractSchema = z.object({
  client: z.string().min(1, "Choose a client"),
  plbReference: z.string().optional(),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
  startDate: z.string().optional(),
  stopDate: z.string().optional(),
  terms: z.string().optional(),
});


export type ContractForm = z.infer<typeof contractSchema>;

export function useCreateContractForm() {
  const navigate = useContractNavigation();

  const form = useForm<ContractForm>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      client: "",
      plbReference: "",
      clientName: "",
      clientEmail: "",
      startDate: "",
      stopDate: "",
      terms: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log("Submitting contract with data:", data);

      const clientId = parseInt(data.client);
      
      if (!clientId || isNaN(clientId)) {
        console.error("Invalid client selected");
        return;
      }

      const result = await contractAPI.create({
        plbReference: data.plbReference || "PLB-" + Date.now(),
        clientId: clientId,
        principalId: null,
        productCode: null,
        orderDate: data.startDate || null,
        status: "ACTIVE",
      });

      console.log("Contract creation result:", result);
      navigate.goToSuccess();
    } catch (error) {
      console.error("Contract creation failed:", error);
    }
  });


  return {
    ...form,
    onSubmit,
  };
}
