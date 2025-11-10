"use client"
import React from "react"
import Layout from "./Layout"

export default function ContractSuccess() {
  const handleBack = () => (window.location.href = "/create")
  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center bg-gray-300">
        <article
          className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm text-center border border-blue-400"
          aria-labelledby="contract-success-heading"
        >
          <figure
            className="bg-[#6DA76D] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </figure>

          <h1
            id="contract-success-heading"
            className="text-lg font-medium text-gray-800 mb-8"
          >
            Contract added successfully!
          </h1>

          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={handleBack}
              className="bg-green-900 text-white py-2 px-6 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              Go back
            </button>
          </div>
        </article>
      </main>
    </Layout>
  )
}