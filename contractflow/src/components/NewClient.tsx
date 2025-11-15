// newclient samler inputs og kaller clientAPI (midlertidig) for å opprette ny klient

"use client"

import React, { useState } from "react";
import type { CreateClientInput } from "../features/fileHandling/interfaces/createClientInput";
import type { Client } from "../app/types/client";
import { clientAPI } from "../lib/clientAPI";
import { InputWithLabel } from "./InputWithLabel";


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



/*   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        setError("klientnavn er påkrevd for lagring av klient.");
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
  } 

  try {
    const response = await fetch("/api/clients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      setError(body?.error || "Det skjedde en feil ved lagring av klient.");
    }

    const createdClient = body?.data;
    onCreate?.(createdClient as Client); 
    setName("");
    setCustomerCode("");
    setEmail("");
    setPhone("");
    setCountry("");
    onCancel?.();
  } catch (error: any) {
    console.error("Error creating client:", error);
    setError(error?.message || "Det skjedde en feil ved lagring av klient.");
  } finally {
    setLoading(false);
  }
} 
 */
 /*  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !customerCode.trim()) {
        setError("Customer and Customer Code are required.");
        return;
    } 
    setError(null);

    const partialClient: Omit<Client, "id"> = {
      customer,
      customerCode,
      contactperson,
      email,
      phone,
      country,
      title,
      relation,
    };

    console.log("Creating client:", partialClient);

    onCreate?.(partialClient as Client);
  } */
  

  return (   
  
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <h3 className="text-lg font-medium mb-4">New Client</h3>

        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">

          <InputWithLabel
  value={name}
  onChange={(e) => setName(e.target.value)}
  label="Company name"
  name="company"
  id="company"
  required
/>

<InputWithLabel
  value={customerCode}
  onChange={(e) => setCustomerCode(e.target.value)}
  label="Customer code"
  name="customerCode"
  id="customerCode"
/>

<InputWithLabel
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  label="Email address"
  type="email"
  name="email"
  id="email"
/>

<InputWithLabel
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  label="Phone number"
  type="tel"
  name="phone"
  id="phone"
/>

<InputWithLabel
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  label="Country"
  name="country"
  id="country"
/>
     {/*      <fieldset className="relative z-0 w-full mb-5 group">
                <input value={name} type="text" name="company" id="company" onChange={e => setName(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label htmlFor="company" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Company name</label>
            </fieldset>

            <fieldset className="relative z-0 w-full mb-5 group">
                <input value={customerCode} type="text" name="customercode" id="customercode" onChange={e => setCustomerCode(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                <label htmlFor="customercode" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Customer code</label>
            </fieldset>

            <div className="grid md:grid-cols-2 md:gap-6">
              <fieldset className="relative z-0 w-full mb-5 group">
                <input value={email} type="email" name="floating_email" id="floating_email" onChange={e => setEmail(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
              </fieldset>
              <fieldset className="relative z-0 w-full mb-5 group">
                <input value={phone} type="tel" pattern="^\+?[0-9\s\-()]{7,20}$" name="floating_phone" id="floating_phone" onChange={e => setPhone(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                <label htmlFor="floating_phone" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
              </fieldset>
            </div>

            <fieldset className="relative z-0 w-full mb-5 group">
              <input value={country} type="text" name="country" id="country" onChange={e => setCountry(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
              <label htmlFor="country" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Country</label>
            </fieldset> */}
        <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
      </form>
    </div>
    )
}
