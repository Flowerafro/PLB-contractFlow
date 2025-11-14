import { getDb, type DB } from '@/db/index';
import { 
    contracts,
    clients,
    shipments,
    principals,
    invoices
} from '@/db/schema/schema';
import { eq, desc } from 'drizzle-orm';
import { HovedListeItem } from '@/app/types/hovedlisten';
import formatDate from '@/features/tables/functions/formatDate';
import type { Result } from '@/app/types/results';

export interface HovedListenRepository {
  findMany(): Promise<Result<HovedListeItem[]>>;
}

export function createHovedListenRepository(): HovedListenRepository {
  return {
    async findMany() {
      try {
        const database = getDb();
        const result = await database.select({
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

        interface RawRow {
          plbReference: string | null;
          orderDate: string | Date | null;
          productCode: string | null;
          tonnPerFcl: number | string | null;
          priceUsdPerMt: number | string | null;
          totalUsd: number | string | null;
          commissionBp: number | string | null;
          customerOrderNo: string | null;
          principalContractNo: number | string | null;
          principalContractDate: string | Date | null;
          principalOrderNo: number | string | null;
          customerName: string | null;
          containerNumber: string | null;
          bookingNo: string | null;
          blNumber: string | null;
          aakDelNo: number | string | null;
          poEta: string | Date | null;
          etd: string | Date | null;
          blDate: string | Date | null;
          eta: string | Date | null;
          tonnesDelivered: number | string | null;
          principalName: string | null;
          invoiceNumber: number | string | null;
          invoiceDate: string | Date | null;
          dueDate: string | Date | null;
          amount: number | string | null;
        }

        const mapped: HovedListeItem[] = (result as RawRow[]).map((row: RawRow): HovedListeItem => ({
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

        return { success: true, data: mapped };
      } catch (error) {
        console.error('Error fetching hovedlisten data:', error);
        return {
          success: false,
          error: {
            code: 500,
            message: (error as Error)?.message ?? "Failed to fetch hovedlisten data from DB",
          },
        };
      }
    }
  };
}

export const hovedListenRepository = createHovedListenRepository();