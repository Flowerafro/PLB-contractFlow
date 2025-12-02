"use client"

import useHoverEffect from "../../app/hooks/useHoverEffect";


export default function ShipmentCard({item, onSelectShipment}: {item: any, onSelectShipment?: (item: any) => void}) {

    const initials = item.customer.split(" ").map((n: string) => n[0]).join("");
    const { hoverEffect, onHover, onLeave } = useHoverEffect<string>();


    return (
          <article key={item.id} className={`w-full max-w-sm border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors ${hoverEffect === item.id ? "bg-gray-100" : "bg-white"}`} onMouseEnter={() => onHover(item.id)} onMouseLeave={() => onLeave()} onClick={() => onSelectShipment?.(item)}>
            <div className="flex flex-col items-center pb-10 pt-6">
                <div className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700 mb-4`}>
                {initials}
            </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                    Container:
                    {item.containerNumber}
                </h3>
                <ul className="list-none p-0 ml-2">
                    <li className=" mb-2 text-sm text-gray-600"> Kunde: {item.customer}</li>
                </ul>
            </div>

            {item.status}
        </article>
    )
}