"use client";

import React, { useState } from "react";
import CreateContractButton from "../../components/CreateContractButton";
import { contractAPI } from "../../lib/contractAPI";
import { dummyClients } from "../../lib/clientdummydata";


type ContractForm = {
  client: string;
  contractName: string;
  clientName: string;
  clientEmail: string;
  startDate: string;
  stopDate: string;
  terms: string;
};

export default function CreateContractPage() {
  const [form, setForm] = useState<ContractForm>({
    client: "",
    contractName: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    stopDate: "",
    terms: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (field: keyof ContractForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    /*
      Midlertidig deaktivert API kall.
      Vi lagrer ikke kontrakten i databasen ennå.
      Når brukeren trykker på Create Contract, går de direkte videre
      til ContractSuccess siden uten å sende data til backend.
    */

    // try {
    //   await contractAPI.create({
    //     plbReference: form.contractName || "PLB-" + Date.now(),
    //     clientId: 1,
    //     principalId: null,
    //     productCode: form.client,
    //     orderDate: form.startDate,
    //     status: "ACTIVE"
    //   });
    // } catch (err) {
    //   setMessage("Error creating contract");
    // }

    // Send alltid videre uansett (mock)
    window.location.href = "/success";

    setLoading(false);
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <ContractFormCard
        form={form}
        onChange={updateField}
        onSubmit={handleSubmit}
        loading={loading}
        message={message}
      />
    </section>
  );
}
function ContractFormCard({
  form,
  onChange,
  onSubmit,
  loading,
  message
}: {
  form: ContractForm;
  onChange: (field: keyof ContractForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  message: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
      <h2 className="text-2xl font-bold text-black mb-8">Create Contract</h2>

      <form onSubmit={onSubmit} className="grid gap-4">

        <FormField label="Choose client">
          <select
            value={form.client}
            onChange={e => onChange("client", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
          >
            <option value="">----</option>

          {dummyClients.map(client => (
            <option key={client.id} value={client.customerCode}>
              {client.customer}
            </option>
          ))}

          </select>
        </FormField>
        <FormInput
          label="Contract name"
          value={form.contractName}
          //required
          placeholder="Shipping contract with"
          onChange={v => onChange("contractName", v)}
        />
        <FormInput
          label="Client name"
          value={form.clientName}
          //required
          placeholder="John Doe"
          onChange={v => onChange("clientName", v)}
        />
        <FormInput
          label="Client email"
          type="email"
          //required
          value={form.clientEmail}
          placeholder="name@email.com"
          onChange={v => onChange("clientEmail", v)}
        />
        <div className="flex gap-2">
          <FormInput
            label="Start date"
            value={form.startDate}
            placeholder="DD/MM/YY"
            onChange={v => onChange("startDate", v)}
          />
          <FormInput
            label="Stop date"
            value={form.stopDate}
            placeholder="DD/MM/YY"
            onChange={v => onChange("stopDate", v)}
          />
        </div>

        <FormField label="Terms and conditions">
          <textarea
            value={form.terms}
            placeholder="Enter text here..."
            onChange={e => onChange("terms", e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-green-900"
          />
        </FormField>

        <CreateContractButton loading={loading} label="Create Contract" />

        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
function FormField({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

function FormInput({
  label,
  value,
  placeholder,
  //required,
  type = "text",
  onChange
}: {
  label: string;
  value: string;
  placeholder?: string;
  //required?: boolean;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormField label={label}>
      <input
        type={type}
        value={value}
        //required={required}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
      />
    </FormField>
  );
}
