"use client";

import React from "react";

import { useCreateContractForm } from "@/app/hooks/contract/useCreateContractForm";
import { useClients } from "@/app/hooks/contract/useClients";
import { useContractFields } from "@/app/hooks/contract/useContractFields";
import CreateContractCard from "../../components/contractComponents/CreateContractCard";

export default function CreateContract() {
  const { control, formState, onSubmit } = useCreateContractForm();
  const { errors, isSubmitting } = formState;

  const { clients, loading: clientsLoading, error: clientError } = useClients();
  const fields = useContractFields();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <CreateContractCard
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        loading={isSubmitting}
        clients={clients}
        fields={fields}
        clientsLoading={clientsLoading}
        clientsError={clientError}
      />
    </section>
  );
  
}
