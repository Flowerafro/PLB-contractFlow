"use client";

import React, { useEffect, useState } from "react";
import type { SearchItem } from "../../app/types/searchItem"
import ButtonClear from "../../components/ButtonClear";
import { ButtonEdit } from "../../components/ButtonEdit";
import Button from "../../components/Button";
import DetailShipmentInfo from "../../components/DetailViewComponents/DetailShipmentInfo";
import DetailInvoiceInfo from "../../components/DetailViewComponents/DetailInvoiceInfo";
import DetailOrderInfo from "../../components/DetailViewComponents/DetailOrderInfo";
import DetailPrincipalInfo from "../../components/DetailViewComponents/DetailPrincipalInfo";


export default function DetailView({ item, setSelectedShipment, isEditing, onEditModeChange }: { item: SearchItem, setSelectedShipment: React.Dispatch<React.SetStateAction<SearchItem | null>>, isEditing: boolean, onEditModeChange: (val: boolean) => void }) {

    const [showButtons, setShowButtons] = useState(false);

    const [form, setForm] = useState({
        plbReference: item.plbReference ?? "",
        plbOrderDate: item.plbOrderDate ?? "",
        customer: item.customer ?? "",
        product: item.product ?? "",
        customerOrderNumber: item.customerOrderNumber ?? "",

        principalContractNumber: item.principalContractNumber ?? "",
        principalContractDate: item.principalContractDate ?? "",
        principalOrderNumber: item.principalOrderNumber ?? "",

        containerNumber: item.containerNumber ?? "",
        bookingNumber: item.bookingNumber ?? "",
        blNumber: item.blNumber ?? "",
        poEta: item.poEta ?? "",
        etd: item.etd ?? "",
        blDate: item.blDate ?? "",
        eta: item.eta ?? "",

        principalInvoiceNumber: item.principalInvoiceNumber ?? "",
        principalInvoiceDate: item.principalInvoiceDate ?? "",
        invoiceDueDate: item.invoiceDueDate ?? "",
        invoiceAmount: item.invoiceAmount ?? "",
    })

    const handleEditClick = () => {
        onEditModeChange(!isEditing);
    }

    useEffect(() => {
        if
         (isEditing) 
         setShowButtons(true);
    }, [isEditing]);

  
  return (
    <>
    <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className=" rounded-3xl flex flex-col px-4">
            <div>
                <a href="/Home">
                <ButtonClear onClick={() => setSelectedShipment(null)}>Tilbake</ButtonClear>
                </a>
                
                </div>
            <div className=" flex items-center justify-end px-6 m-4 gap-2">
                {showButtons && (
                <ButtonEdit onClick={handleEditClick}>{isEditing ? "Avbryt" : "Rediger"}</ButtonEdit>)}
                 <Button onClick={() => {
                    if (isEditing) return; 
                    setShowButtons((prev) => !prev); }} disabled={isEditing}> {showButtons ? "Lukk" : "Endre"}
                </Button>
            </div>
            <div className="flex-1 p-4 space-y-6 w-full">
                <DetailOrderInfo form={form} setForm={setForm} isEditing={isEditing} />
                 <DetailShipmentInfo form={form} setForm={setForm} isEditing={isEditing}  />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailInvoiceInfo form={form} setForm={setForm} isEditing={isEditing}  />
                    <DetailPrincipalInfo form={form} setForm={setForm} isEditing={isEditing}  />
                </div>
            </div>
            {/* <ActionSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onEdit={handleEditClick} isEditing={isEditing} handleEditClick={handleEditClick} /> */}
        </div>
    </section> 
    </>

  );

}