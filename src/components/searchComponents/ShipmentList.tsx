"use client";


import ButtonClear from "../buttons/ButtonClear";
import ShipmentCard from "./ShipmentCard";


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
      
      
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredItems.map((item) => (
        <ShipmentCard key={item.id} item={item} onSelectShipment={onSelectShipment} />
        ))} 
        
      </div>
    </section>
  );
}

