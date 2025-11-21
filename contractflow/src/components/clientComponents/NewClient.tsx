// newclient samler inputs og kaller clientAPI (midlertidig) for å opprette ny klient

"use client"

import React, { useState } from "react";
import type { CreateClientInput } from "@/features/fileHandling/interfaces/createClientInput";
import type { Client } from "@/app/types/client";
import { clientAPI } from "@/lib/clientAPI";
import type { InputNewClient } from "@/app/types/InputNewClient";
import { InputWithLabelSubmitForm } from "@/components/InputWithLabelSubmitForm";
import ButtonClear from "@/components/ButtonClear";
/* import { InputWLabelClient } from "./InputWLabelClient"; */


interface NewClientProps {
  onCreate?: (client: Client) => void;
  onCancel?: () => void;
}

export default function NewClient({ onCreate, onCancel }: NewClientProps) {


const [name, setName] = useState("");
const [customerCode, setCustomerCode] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [country, setCountry] = useState("");
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name.trim()) {
    setError("Navn på klient er påkrevd for å lagring i databasen");
    return;
  }

  setError(null);
  setLoading(true);

  const clientData: CreateClientInput = {
    name: name.trim(),
    customerCode: customerCode.trim() || undefined,
    email: email.trim() || undefined,
    phone: phone.trim() || undefined,
    country: country.trim() || undefined,
  };

  try {
    const createdClient = await clientAPI.create(clientData);
    onCreate?.(createdClient);
    setName("");
    setCustomerCode("");
    setEmail("");
    setPhone("");
    setCountry("");
    onCancel?.();
  } catch (error: any) {
    console.error("Feil ved lagring av klient:", error);
    setError(error?.message || "Det oppstod en feil ved lagring av klient.");
  } finally {
    setLoading(false);
  }
} 

  return (   
  
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md w-3xl" onSubmit={handleSubmit}>
          <ButtonClear onClick={onCancel} className="mb-4">X</ButtonClear>
          <h3 className="text-lg font-medium mb-4 p-4">New Client</h3>
          <InputWithLabelSubmitForm value={name} onChange={(e) => setName(e.target.value)} label="Company name" name="company" id="company" required/>
          <InputWithLabelSubmitForm value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} label="Customer code" name="customerCode" id="customerCode"/>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputWithLabelSubmitForm value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" type="email" name="email" id="email"/>
            <InputWithLabelSubmitForm value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone number" type="tel" name="phone" id="phone"/>
          </div>
          <InputWithLabelSubmitForm value={country} onChange={(e) => setCountry(e.target.value)} label="Country" name="country" id="country"/>
        <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
      </form>
    </div>
    )
  }

