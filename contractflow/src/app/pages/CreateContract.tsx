"use client"
import React, { useState } from "react"
import CreateContractButton from "../../components/CreateContractButton"

type ContractForm = {
  client: string
  contractName: string
  clientName: string
  clientEmail: string
  startDate: string
  stopDate: string
  terms: string
}

export default function CreateContractPage() {
  const [form, setForm] = useState<ContractForm>({
    client: "",
    contractName: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    stopDate: "",
    terms: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
  
    try {
      const res = await fetch("/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plbReference: form.contractName || "PLB-" + Date.now(),
          clientId: 1,
          principalId: null,
          productCode: form.client,
          orderDate: form.startDate,
          tonnPerFcl: null,
          priceUsdPerMtC: 0,
          totalUsdC: 0,
          commissionGroupBp: null,
          customerOrderNo: null,
          principalContractNo: null,
          principalContractDate: null,
          principalOrderNo: null,
          status: "ACTIVE"
        })
      })
      if (!res.ok) throw new Error("Failed to save contract")
      setMessage("Contract successfully created")
      window.location.href = "/success"
    } catch {
      setMessage("Error creating contract")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
      <h2 className="text-2xl font-bold text-black mb-8">Create Contract</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block font-medium mb-1">Choose client</label>
            <select
              value={form.client}
              onChange={e => setForm({ ...form, client: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              <option value="">----</option>
              <option value="plb">PLB Consulting</option>
              <option value="nordic">Nordic Shipping</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Contract name</label>
            <input
              type="text"
              placeholder="Shipping contract with"
              value={form.contractName}
              onChange={e => setForm({ ...form, contractName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Client name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.clientName}
              onChange={e => setForm({ ...form, clientName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Client email</label>
            <input
              type="email"
              placeholder="name@email.com"
              value={form.clientEmail}
              onChange={e => setForm({ ...form, clientEmail: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Start date</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">Stop date</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={form.stopDate}
                onChange={e => setForm({ ...form, stopDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Terms and conditions</label>
            <textarea
              placeholder="Enter text here..."
              value={form.terms}
              onChange={e => setForm({ ...form, terms: e.target.value })}
              className="w-full h-32 p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-green-900"
            />
          </div>

          <CreateContractButton loading={loading} label="Create Contract" />

          {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
        </form>
      </div>
    </section>
  )
}