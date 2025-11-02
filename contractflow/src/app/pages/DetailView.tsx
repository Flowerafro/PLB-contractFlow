"use client";

import React from "react";

interface SearchItem {
  id?: number;
  customer?: string;
  customerOrderNumber?: string;
  containerNumber?: string;
  product?: string;
  poEta?: string;
  etd?: string;
  invoiceNumber?: string;
  invoiceAmount?: string;
  bookingNumber?: string;
  blNumber?: string;
}

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

  
  return (
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
                Actions
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-left">
                    <div >
                        <div className="text-sm font-medium text-gray-900">
                            {customer}
                        </div>
                        <div className="text-sm text-gray-500">
                            {customerOrder}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {product}
                        </div>
                        <div className="text-sm text-gray-500">
                            {customerOrder}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {container}
                        </div>
                        <div className="text-sm text-gray-500">
                            {blNumber}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
               <div className="flex items-center">
                   <div>
                       <div className="text-sm font-medium text-gray-900">
                           ETD: {etd}
                       </div>
                       <div className="text-sm text-gray-500">
                           ETA: {poEta}
                       </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {invoiceNo}
                        </div>
                        <div className="text-sm text-gray-500">
                            {invoiceAmount}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
            </td>
        </tr>
    </tbody>
</table>

  );
}

/* /*   <article className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color] p-4">
      <div className="flex flex-col items-left pb-4">
        <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray)] dark:text-black">Klient: {customer} No.: {customerOrder}</h5>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Container: {container}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Product: {product}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">ETA: {poEta} ETD: {etd}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Invoice No.: {invoiceNo} Amount: {invoiceAmount}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">Booking No.: {booking}</p>
        <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">BL No.: {blNumber}</p>
      </div>
    </article> */
/*     <section className="flex flex-col antialiased text-gray-600 p-4">
    <div className="h-full">
        <div className="bg-[var(--bg-color)] shadow-lg rounded-lg">
            <div className="px-6 py-5">
                <div className="flex items-start">
                <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                        <path className="text-[var(--secondary-color)]" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                        <path className="text-[var(--dark-color)]" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                        <path className="text-[var(--bg-white)]" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                    </svg> 
                    <div className="flex-grow truncate">
                        <div className="w-full sm:flex justify-between items-center mb-3">
                            <h2 className="text-2xl leading-snug font-extrabold text-[var(--text-color-black)] truncate mb-1 sm:mb-0">{customer}</h2>
                        </div>
                        <div className="flex items-end justify-between whitespace-normal">
                            <div className="max-w-md text-[var(--text-color-black)]">
                                <p className="mb-2">Container: {container}</p>
                            </div>
                            <a className="flex-shrink-0 flex items-center justify-center text-[var(--text-color-black)] w-10 h-10 rounded-full bg-[var(--bg-white)] hover:bg-[var(--secondary-color)] focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                                <span className="block font-bold"><span className="sr-only">Open</span> → </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section> */