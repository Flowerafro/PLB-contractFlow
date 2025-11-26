import { HovedListeItem } from '@/app/types/hovedlisten';
import { AppContext } from '@/worker';
import { HovedListenService } from '../interfaces/hovedListenService';

function getSampleData(): HovedListeItem[] {
  return [
    {
      plbReference: 'PLB-2024-001',
      plbOrderDate: '15.01.2024',
      customer: 'Acme Corporation',
      product: 'Steel Grade A',
      tonn: 25.5,
      priceUsdMt: 850.00,
      totalPriceUsd: 21675.00,
      prisgrProv: 2.5,
      poEta: '20.02.2024',
      etd: '25.02.2024',
      customerOrderNumber: 'ACM-2024-123',
      principalContractNumber: 789456,
      principalContractDate: '10.01.2024',
      principalOrderNumber: 555789,
      containerNumber: 'MSKU-1234567',
      principalInvoiceNumber: 2024001,
      principalInvoiceDate: '28.02.2024',
      invoiceDueDate: '30.03.2024',
      tonnesDeliveres: 25.5,
      invoiceAmount: 21675.00,
      blDate: '27.02.2024',
      eta: '15.03.2024',
      bookingNumber: 'BK789123',
      blNumber: 'BL456789',
      aakDelNumber: 98765,
    },
    {
      plbReference: 'PLB-2024-002',
      plbOrderDate: '22.01.2024',
      customer: 'Global Manufacturing Ltd',
      product: 'Aluminum Sheets',
      tonn: 18.2,
      priceUsdMt: 1200.00,
      totalPriceUsd: 21840.00,
      prisgrProv: 3.0,
      poEta: '01.03.2024',
      etd: '05.03.2024',
      customerOrderNumber: 'GM-2024-456',
      principalContractNumber: 789457,
      principalContractDate: '18.01.2024',
      principalOrderNumber: 555790,
      containerNumber: 'COSCO-7890123',
      principalInvoiceNumber: 2024002,
      principalInvoiceDate: '08.03.2024',
      invoiceDueDate: '08.04.2024',
      tonnesDeliveres: 18.2,
      invoiceAmount: 21840.00,
      blDate: '07.03.2024',
      eta: '25.03.2024',
      bookingNumber: 'BK789124',
      blNumber: 'BL456790',
      aakDelNumber: 98766,
    }
  ];
}

export default function useHovedListenService(): HovedListenService {
  return {
    async getHovedListenData(): Promise<HovedListeItem[]> {
      try {
        if (typeof window !== 'undefined') {
          try {
            const response = await fetch('/hovedlisten');
            if (response.ok) {
              const result: { success: boolean; data: HovedListeItem[] } = await response.json();
              return result.success ? result.data : [];
            }
          } catch (apiError) {
            console.log('API call failed, falling back to sample data:', apiError);
            return [];
//            return getSampleData();
          }
        }

        console.log('Using empty data for development');
        return [];
      } catch (error) {
        console.error('Service error, falling back to sample data:', error);
        return [];
      }
    }
  };
}