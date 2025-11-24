import { getDb } from '@/db/index';
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
import type { HovedListenRepository } from '../interfaces/hovedListenRepository';

export function createHovedListenRepository(): HovedListenRepository {
  return {
    async findMany(env) {
      try {
        const database = getDb(env);
        if (!database) {
          return {
            success: false,
            error: {
              code: 500,
              message: "Database connection is undefined",
            },
          };
        }
        const result = await database
          .select()
          .from(contracts)
          .leftJoin(clients, eq(contracts.clientId, clients.id))
          .leftJoin(principals, eq(contracts.principalId, principals.id))
          .leftJoin(shipments, eq(shipments.contractId, contracts.id))
          .leftJoin(invoices, eq(invoices.contractId, contracts.id))
          .where(eq(contracts.status, 'ACTIVE'))
          .orderBy(desc(contracts.createdAt));

        const mapped: HovedListeItem[] = (result as any[]).map((row: any): HovedListeItem => {
          const contracts = row.contracts || {};
          const clients = row.clients || {};
          const shipments = row.shipments || {};
          const principals = row.principals || {};
          const invoices = row.invoices || {};
          return {
            plbReference: contracts.plbReference || '',
            plbOrderDate: contracts.orderDate ? formatDate(new Date(contracts.orderDate)) : '',
            customer: clients.name || 'Unknown',
            product: contracts.productCode || 'Unknown',
            tonn: Number(contracts.tonnPerFcl) || 0,
            priceUsdMt: Number(contracts.priceUsdPerMtC) || 0,
            totalPriceUsd: Number(contracts.totalUsdC) || 0,
            prisgrProv: Number(contracts.commissionGroupBp) || 0,
            poEta: shipments.poEta ? formatDate(new Date(shipments.poEta)) : '',
            etd: shipments.etd ? formatDate(new Date(shipments.etd)) : '',
            customerOrderNumber: contracts.customerOrderNo || '',
            principalContractNumber: Number(contracts.principalContractNo) || 0,
            principalContractDate: contracts.principalContractDate ? formatDate(new Date(contracts.principalContractDate)) : '',
            principalOrderNumber: Number(contracts.principalOrderNo) || 0,
            containerNumber: shipments.containerNumber || '',
            principalInvoiceNumber: Number(invoices.principalInvoiceNo) || 0,
            principalInvoiceDate: invoices.principalInvoiceDate ? formatDate(new Date(invoices.principalInvoiceDate)) : '',
            invoiceDueDate: invoices.invoiceDueDate ? formatDate(new Date(invoices.invoiceDueDate)) : '',
            tonnesDeliveres: Number(shipments.tonnesDelivered) || 0,
            invoiceAmount: Number(invoices.invoicedAmountC) || 0,
            blDate: shipments.blDate ? formatDate(new Date(shipments.blDate)) : '',
            eta: shipments.eta ? formatDate(new Date(shipments.eta)) : '',
            bookingNumber: shipments.bookingNo || '',
            blNumber: shipments.blNumber || '',
            aakDelNumber: Number(shipments.aakDelNo) || 0,
          };
        });

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
