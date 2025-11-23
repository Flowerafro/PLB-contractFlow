import { hovedListenRepository } from '@/features/dataRetrieval/repositoryPatterns/hovedListenRepository';
import { HovedListeItem } from '@/app/types/hovedlisten';
import { AppContext } from '@/worker';
import { env } from 'process';

export interface HovedListenService {
  getHovedListenData(): Promise<HovedListeItem[]>;
}

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

function createHovedListenService(): HovedListenService {
  return {
    async getHovedListenData(): Promise<HovedListeItem[]> {
      try {
        if (typeof window !== 'undefined') {
          try {
            const response = await fetch('/api/v1/hovedlisten/');
            if (response.ok) {
              const result: { success: boolean; data: HovedListeItem[] } = await response.json();
              return result.success ? result.data : getSampleData();
            }
          } catch (apiError) {
            console.log('API call failed, falling back to sample data:', apiError);
            return getSampleData();
          }
        }

        try {
          const result = await hovedListenRepository.findMany(env);
          if (result && result.success && Array.isArray(result.data)) {
            return result.data;
          }
        } catch (dbError) {
          console.log('Database access failed, using sample data:', dbError);
        }

        console.log('Using sample data for development');
        return getSampleData();
      } catch (error) {
        console.error('Service error, falling back to sample data:', error);
        return getSampleData();
      }
    }
  };
}

export const hovedListenService = createHovedListenService();

/*
import { 
    db,
    contracts,
    clients,
    shipments,
    principals,
    invoices
} from '@/db/index';
import { eq, desc, sql } from 'drizzle-orm';
import { HovedListeItem } from '@/app/types/hovedlisten';
import formatDate from '@/features/tables/functions/formatDate';


export class HovedListenDbService {
    async getHovedListenData(): Promise<HovedListeItem[]> {
        try {
            const result = await db.select({
                plbReference: contracts.plbReference,
                orderDate: contracts.orderDate,
                productCode: contracts.productCode,
                tonnPerFcl: contracts.tonnPerFcl,
                priceUsdPerMt: contracts.priceUsdPerMtC,
                totalUsd: contracts.totalUsdC,
                commissionBp: contracts.commissionGroupBp,
                customerOrderNo: contracts.customerOrderNo,
                principalContractNo: contracts.principalContractNo,
                principalContractDate: contracts.principalContractDate,
                principalOrderNo: contracts.principalOrderNo,

                customerName: clients.name,

                containerNumber: shipments.containerNumber,
                bookingNo: shipments.bookingNo,
                blNumber: shipments.blNumber,
                aakDelNo: shipments.aakDelNo,
                poEta: shipments.poEta,
                etd: shipments.etd,
                blDate: shipments.blDate,
                eta: shipments.eta,
                tonnesDelivered: shipments.tonnesDelivered,      
                
                principalName: principals.name,

                invoiceNumber: invoices.principalInvoiceNo,
                invoiceDate: invoices.principalInvoiceDate,
                dueDate: invoices.invoiceDueDate,
                amount: invoices.invoicedAmountC            
            })
            .from(contracts)
            .leftJoin(clients, eq(contracts.clientId, clients.id))
            .leftJoin(principals, eq(contracts.principalId, principals.id))
            .leftJoin(shipments, eq(shipments.contractId, contracts.id))
            .leftJoin(invoices, eq(invoices.contractId, contracts.id))
            .where(eq(contracts.status, 'ACTIVE'))
            .orderBy(desc(contracts.createdAt));

            interface DbRow {
                plbReference?: string;
                orderDate?: string | Date;
                productCode?: string;
                tonnPerFcl?: number | string;
                priceUsdPerMt?: number | string;
                totalUsd?: number | string;
                commissionBp?: number | string;
                customerOrderNo?: string;
                principalContractNo?: number | string;
                principalContractDate?: string | Date;
                principalOrderNo?: number | string;
                customerName?: string;
                containerNumber?: string;
                bookingNo?: string;
                blNumber?: string;
                aakDelNo?: number | string;
                poEta?: string | Date;
                etd?: string | Date;
                blDate?: string | Date;
                eta?: string | Date;
                tonnesDelivered?: number | string;
                principalName?: string;
                invoiceNumber?: number | string;
                invoiceDate?: string | Date;
                dueDate?: string | Date;
                amount?: number | string;
            }

            // If result is empty (mock database), return sample data for development
            if (result.length === 0) {
                console.log('No database data found, returning sample data for development');
                return this.getSampleData();
            }

            return result.map((row: DbRow): HovedListeItem => ({
                plbReference: row.plbReference || '',
                plbOrderDate: row.orderDate ? formatDate(new Date(row.orderDate)) : '',
                customer: row.customerName || 'Unknown',
                product: row.productCode || 'Unknown',
                tonn: Number(row.tonnPerFcl) || 0,
                priceUsdMt: Number(row.priceUsdPerMt) || 0,
                totalPriceUsd: Number(row.totalUsd) || 0,
                prisgrProv: Number(row.commissionBp) || 0,
                poEta: row.poEta ? formatDate(new Date(row.poEta)) : '',
                etd: row.etd ? formatDate(new Date(row.etd)) : '',
                customerOrderNumber: row.customerOrderNo || '',
                principalContractNumber: Number(row.principalContractNo) || 0,
                principalContractDate: row.principalContractDate ? formatDate(new Date(row.principalContractDate)) : '',
                principalOrderNumber: Number(row.principalOrderNo) || 0,
                containerNumber: row.containerNumber || '',
                principalInvoiceNumber: Number(row.invoiceNumber) || 0,
                principalInvoiceDate: row.invoiceDate ? formatDate(new Date(row.invoiceDate)) : '',
                invoiceDueDate: row.dueDate ? formatDate(new Date(row.dueDate)) : '',
                tonnesDeliveres: Number(row.tonnesDelivered) || 0,
                invoiceAmount: Number(row.amount) || 0,
                blDate: row.blDate ? formatDate(new Date(row.blDate)) : '',
                eta: row.eta ? formatDate(new Date(row.eta)) : '',
                bookingNumber: row.bookingNo || '',
                blNumber: row.blNumber || '',
                aakDelNumber: Number(row.aakDelNo) || 0,
            }));
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            console.log('Falling back to sample data for development');
            return this.getSampleData();
        }
    }

    private getSampleData(): HovedListeItem[] {
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
}
export const hovedListenDbService = new HovedListenDbService();
*/