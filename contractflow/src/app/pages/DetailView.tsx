"use client";

import React from "react";
import type { SearchItem } from "@/app/types/searchItem"


export default function DetailView({ item }: { item: SearchItem }) {

    const customer = item.customer ?? "Ukjent";
    const customerOrder = item.customerOrderNumber ?? "Ukjent";
    const container = item.containerNumber ?? "Ukjent";
    const product = item.product ?? "Ukjent";
    const poEta = item.poEta ?? "Ukjent";
    const etd = item.etd ?? "Ukjent";
    const invoiceNo = item.invoiceNumber ?? "Ukjent"; 
    const invoiceAmount = item.invoiceAmount ?? "Ukjent";
    const booking = item.bookingNumber ?? "Ukjent";
    const blNumber = item.blNumber ?? "Ukjent";
    const principalContractNumber = item.principalContractNumber ?? "Ukjent";
    const principalContractDate = item.principalContractDate ?? "Ukjent";
    const principalOrderNumber = item.principalOrderNumber ?? "Ukjent";

  
  return (
    <>
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Container Info
            </th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipment Info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Principal info
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <td className="px-6 py-4 whitespace-nowrap align-top">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap align-top">
                <div className="flex items-left">
                    <div className="flex flex-col items-start">
                        <div className="text-sm font-medium text-gray-900 pb-2">
                            {customer}
                        </div>
                        <div className="text-sm text-gray-500 pb-2">
                            {customerOrder}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap align-top">
                <div className="flex items-left">
                    <div className="flex flex-col items-start">
                        <div className="text-sm font-medium text-gray-900 pb-2">
                            {product}
                        </div>
                        <div className="text-sm text-gray-500 pb-2">
                            {customerOrder}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-500">
                <div className="flex items-left">
                    <div>
                        <div className="text-sm font-medium text-gray-900 pb-2">
                            {container}
                        </div>
                        <div className="text-sm text-gray-500 pb-2">
                            {blNumber}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-500">
               <div className="flex items-left">
                    <div className="flex flex-col items-start">
                       <div className="text-sm font-medium text-gray-900 pb-2">
                           ETD: {etd}
                       </div>
                       <div className="text-sm text-gray-500 pb-2">
                           ETA: {poEta}
                       </div>
                         <div className="text-sm text-gray-500 pb-2">
                           Booking: {booking}
                       </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm align-top text-gray-500">
                <div className="flex items-left">
                    <div>
                        <div className="text-sm font-medium text-gray-900 pb-2">
                            <span className="text-bold">No.</span> {invoiceNo}
                        </div>
                        <div className="text-sm text-gray-500 pb-2">
                            {invoiceAmount} USD$
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap  text-sm align-top font-medium">
                <div className="flex flex-col items-left"> 
                    <div className="text-sm font-medium text-gray-900 pb-2">
                           Contract: {principalContractNumber}
                       </div>
                     <div className="text-sm text-gray-500 pb-2">
                           Date: {principalContractDate}
                       </div>
                         <div className="text-sm text-gray-500 pb-2">
                            Order: {principalOrderNumber}
                       </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<div className="w-full pt-6 flex items-center justify-end">
    <a href="#" className="text-white bg-[var(--primary-color)] p-2 rounded-2xl mr-10">View More</a>
      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
      <a href="#" className="ml-4 text-xs text-white hover:text-black bg-[var(--red-color)] p-2 rounded-2xl" >Delete</a>
</div>
</>

  );
}