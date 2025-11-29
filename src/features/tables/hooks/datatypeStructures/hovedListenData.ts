
import { useData } from '@/features/tables/hooks/useData';
import { HovedListeItem } from '@/app/types/hovedlisten';
import formatDate from '@/lib/formatDate';
import { useMemo } from 'react';


const dateParseCache = new Map<string, Date>();

const parseDate = (dateStr: string): Date => {
    if (dateParseCache.has(dateStr)) {
        return dateParseCache.get(dateStr)!;
    }
    const date = new Date(dateStr);
    dateParseCache.set(dateStr, date);
    return date;
};

const transformHovedListenItem = (item: any): HovedListeItem => ({
    plbReference: item.plbReference || '',
    plbOrderDate: formatDate(parseDate(item.plbOrderDate)) || '',
    customer: item.customer || 'Unknown',
    product: item.product || 'Unknown',
    tonn: Number(item.tonn) || 0,
    priceUsdMt: Number(item.priceUsdMt) || 0,
    totalPriceUsd: Number(item.totalPriceUsd) || 0,
    prisgrProv: Number(item.prisgrProv) || 0,
    poEta: formatDate(parseDate(item.poEta)) || '',
    etd: formatDate(parseDate(item.etd)) || '',
    customerOrderNumber: item.customerOrderNumber || '',
    principalContractNumber: Number(item.principalContractNumber) || 0,
    principalContractDate: formatDate(parseDate(item.principalContractDate)) || '',
    principalOrderNumber: Number(item.principalOrderNumber) || 0,
    containerNumber: item.containerNumber || '',
    principalInvoiceNumber: Number(item.principalInvoiceNumber) || 0,
    principalInvoiceDate: formatDate(parseDate(item.principalInvoiceDate)) || '',
    invoiceDueDate: formatDate(parseDate(item.invoiceDueDate)) || '',
    tonnesDeliveres: Number(item.tonnesDeliveres) || 0,
    invoiceAmount: Number(item.invoiceAmount) || 0,
    blDate: formatDate(parseDate(item.blDate)) || '',
    eta: formatDate(parseDate(item.eta)) || '',
    bookingNumber: item.bookingNumber || '',
    blNumber: item.blNumber || '',
    aakDelNumber: Number(item.aakDelNumber) || 0,
});
/*
export function hovedListenData(){
    const dataSource = useMemo(() => ({
        path: '/dummyData/hoved_listen_paaLissom.json',
        transform: (rawData: any[]) => rawData.map(transformHovedListenItem),
        errorMessage: 'PLB contract data did not load'
    }), []);

    return useData<HovedListeItem>(dataSource);
}
    */