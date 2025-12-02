"use client"
import React from "react"

type Props = {
  loading?: boolean
  label?: string
}
export default function CreateContractButton({ loading, label = "Create Contract" }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded-md px-6 py-2 font-medium text-white 
        transition-opacity duration-200 
        ${loading ? "bg-green-900 opacity-70 cursor-not-allowed" : "bg-green-900 hover:bg-green-800"}
      `}
    >
      {loading ? "Saving..." : label}
    </button>
  )
}
