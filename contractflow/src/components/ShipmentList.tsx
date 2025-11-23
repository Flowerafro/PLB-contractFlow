"use client";

import DetailView from "@/app/pages/DetailView";
import { SearchItem } from "@/app/types/searchItem";
import React from "react";
import ButtonClear from "./ButtonClear";
import ShipmentCard from "./ShipmentCard";

/* interface SearchItem {
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
} */

  interface ShipmentListProps {
    filteredItems: any[];
    onSelectShipment?: (shipment: any) => void;
  }

export default function ShipmentList({ filteredItems, onSelectShipment }: ShipmentListProps) {


  return (
    <section className="bg-[var(--bg-white)] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl/7 font-bold text-[var(--text-color-black)] sm:truncate sm:text-3xl sm:tracking-tight mb-4">Søkeresultater:</h2>
      <div className="flex flex-row justify-between items-center p-2 mb-4">
        <a href="/Home">
          <ButtonClear>Tilbake</ButtonClear>
        </a>
        <div className="p-4 rounded bg-gray-200">
          <span className="font-bold px-2">{filteredItems.length} :</span> 
            forsendelser funnet
        </div>
      </div>
      
      
      <div className="mb-2">
      {filteredItems.map((item) => (
        <ShipmentCard key={item.id} item={item} onSelectShipment={onSelectShipment} />
        ))} 
        
      </div>
    </section>
  );
}

