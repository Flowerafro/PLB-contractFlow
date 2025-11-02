import UseData from '@/app/features/tables/custom_hooks/UseData';
import { HovedListeItem } from '@/app/types/types';

/*
    -Henter data fra json-fil knyttet til hovedfilen-
    Her er verdiene tatt fra hovedliste-eksempelet vi 
    ble tilsendt. Her er det igjen problemer med dato-
    formatet.
*/

export function HovedListenData(){
    return UseData<HovedListeItem>({
        path: '../../../resources/hoved_listen_paaLissom.json',
        transform: (rawData: any[]) => rawData.map((item: any) => ({
            plbReference: item.plbReference || '',
            plbOrderData: item.plbOrderData || '',
            customer: item.customer || 'Unknown',
            product: item.product || 'Unknown',
            tonn: Number(item.tonn) || 0,
            priceUsdMt: Number(item.priceUsdMt) || 0,
            totalPriceUsd: Number(item.totalPriceUsd) || 0,
            prisgrProv: Number(item.prisgrProv) || 0,
            poEta: item.poEta || '',
            etd: item.etd || '',
            customerOrderNumber: item.customerOrderNumber || '',
            principalContractNumber: Number(item.principalContractNumber) || 0,
            principalContractDate: item.principalContractDate || '',
            principalOrderNumber: Number(item.principalOrderNumber) || 0,
            containerNumber: item.containerNumber || '',
            principalInvoiceNumber: Number(item.principalInvoiceNumber) || 0,
            principalInvoiceDate: item.principalInvoiceDate || '',
            invoiceDueDate: item.invoiceDueDate || '',
            tonnesDeliveres: Number(item.tonnesDeliveres) || 0,
            invoiceAmount: Number(item.invoiceAmount) || 0,
            blDate: item.blDate || '',
            eta: item.eta || '',
            bookingNumber: item.bookingNumber || '',
            blNumber: item.blNumber || '',
            aakDelNumber: Number(item.aakDelNumber) || 0,
        })),

/*        transform: (rawData: any[]) => rawData.map((item: any) => ({
            plbReference: new Date(item.plbReference || Date.now()),
            plbOrderData: new Date(item.plbOrderData || Date.now()),
            customer: item.customer || 'Unknown',
            product: item.product || 'Unknown',
            tonn: Number(item.tonn) || 0,
            priceUsdMt: Number(item.priceUsdMt) || 0,
            totalPriceUsd: Number(item.totalPriceUsd) || 0,
            prisgrProv: Number(item.prisgrProv) || 0,
            poEta: new Date(item.poEta || Date.now()),
            etd: new Date(item.etd || Date.now()),
            customerOrderNumber: item.customerOrderNumber || '',
            principalContractNumber: Number(item.principalContractNumber) || 0,
            principalContractDate: new Date(item.principalContractDate || Date.now()),
            principalOrderNumber: Number(item.principalOrderNumber) || 0,
            containerNumber: item.containerNumber || '',
            principalInvoiceNumber: Number(item.principalInvoiceNumber) || 0,
            principalInvoiceDate: new Date(item.principalInvoiceDate || Date.now()),
            invoiceDueDate: new Date(item.invoiceDueDate || Date.now()),
            tonnesDeliveres: Number(item.tonnesDeliveres) || 0,
            invoiceAmount: Number(item.invoiceAmount) || 0,
            blDate: new Date(item.blDate || Date.now()),
            eta: new Date(item.eta || Date.now()),
            bookingNumber: item.bookingNumber || '',
            blNumber: item.blNumber || '',
            aakDelNumber: Number(item.aakDelNumber) || 0,
        })),
*/
        errorMessage: 'PLB contract data did not load'
    });
}