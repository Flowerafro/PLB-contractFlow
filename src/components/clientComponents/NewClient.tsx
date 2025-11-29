// Igjen revertert tl dummydata for å unngå avhengighet til uferdig clientAPI og DB-lagring
/* import { InputWLabelClient } from "./InputWLabelClient"; */
//import { clientAPI } from "@/lib/clientAPI"; 

"use client"

import type { CreateClientInput } from "@/features/fileHandling/interfaces/createClientInput";
import React, { useState } from "react";
import type { Client } from "../../lib/clientdummydata";
import { addClient } from "../../lib/clientdummydata";
import { InputWithLabelSubmitForm } from "@/components/clientComponents/InputWithLabelSubmitForm";
import ButtonClear from "@/components/buttons/ButtonClear";



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

/* 


Kommentert ut fordi det er satt opp for clientAPI og lagring til DB som ikke er ferdig enda
*/
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
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...clientData, status: "ACTIVE" }),
    });

    if (!response.ok) throw new Error('Failed to create client');

    const data = await response.json() as any;
    if (data.success) {    
      const createdClient = data.data;
      onCreate?.(createdClient);
      setName("");
      setCustomerCode("");
      setEmail("");
      setPhone("");
      setCountry("");
      onCancel?.();
    } 
    else {
      setError(data.error?.message || 'Failed to create client');
    } 
  } catch (err) {
    console.error("Error creating client:", err);
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
}  

/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Navn på klient er påkrevd for å lagring i databasen");
      return;
    }

    setError(null);
    setLoading(true);

    const newClient: Omit<Client, "id"> = {
      customer: name.trim(),
      customerCode: customerCode.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      country: country.trim() || undefined,
      relation: "",
      contactperson: "",
      title: "",
      clientAdded: new Date().toISOString(),
      status: "Active",
    }

    const createdClient = addClient(newClient)
    onCreate?.(createdClient);
    onCancel?.();
  }
*/
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
        <button 
          type="submit" 
          disabled={loading}
          className="
            text-white 
            bg-brand 
            box-border 
            border 
            border-transparent 
            hover:bg-brand-strong 
            focus:ring-4 
            focus:ring-brand-medium shadow-xs 
            font-medium 
            leading-5 
            rounded-base 
            text-sm 
            px-4 
            py-2.5 
            focus:outline-none"
          >
            {loading ? "Creating..." : "Submit"}
          </button>
      </form>
    </div>
    )
  }

