import UseData from '@/app/features/tables/custom_hooks/UseData';
import { HovedListeItem } from '@/app/types/types';
import formatDate from '@/app/features/tables/functions/DateFormatter';

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
            plbOrderDate: formatDate(new Date(item.plbOrderDate)) || '',
            customer: item.customer || 'Unknown',
            product: item.product || 'Unknown',
            tonn: Number(item.tonn) || 0,
            priceUsdMt: Number(item.priceUsdMt) || 0,
            totalPriceUsd: Number(item.totalPriceUsd) || 0,
            prisgrProv: Number(item.prisgrProv) || 0,
            poEta: formatDate(new Date(item.poEta)) || '',
            etd: formatDate(new Date(item.etd)) || '',
            customerOrderNumber: item.customerOrderNumber || '',
            principalContractNumber: Number(item.principalContractNumber) || 0,
            principalContractDate: formatDate(new Date(item.principalContractDate)) || '',
            principalOrderNumber: Number(item.principalOrderNumber) || 0,
            containerNumber: item.containerNumber || '',
            principalInvoiceNumber: Number(item.principalInvoiceNumber) || 0,
            principalInvoiceDate: formatDate(new Date(item.principalInvoiceDate)) || '',
            invoiceDueDate: formatDate(new Date(item.invoiceDueDate)) || '',
            tonnesDeliveres: Number(item.tonnesDeliveres) || 0,
            invoiceAmount: Number(item.invoiceAmount) || 0,
            blDate: formatDate(new Date(item.blDate)) || '',
            eta: formatDate(new Date(item.eta)) || '',
            bookingNumber: item.bookingNumber || '',
            blNumber: item.blNumber || '',
            aakDelNumber: Number(item.aakDelNumber) || 0,
        })),

        errorMessage: 'PLB contract data did not load'
    });
}