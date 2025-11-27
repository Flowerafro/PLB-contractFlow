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
import type { D1Database } from '@cloudflare/workers-types';

function safeNumber(value: any): number {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function safeDate(value: any): string {
  if (!value) return '';
  try {
    const date = new Date(value);
    return formatDate(date);
  } catch {
    return '';
  }
}

export function createHovedListenRepository(): HovedListenRepository {
  return {
    async findMany(env) {
      try {
        const database = env.DB;
        if (!database) {
          return {
            success: false,
            error: {
              code: 500,
              message: "Database connection is undefined",
            },
          };
        }

        const query = `
          SELECT 
            contracts.plb_reference,
            contracts.order_date AS plbOrderDate,
            clients.name AS customer,
            contracts.product_code AS product,
            contracts.tonn_per_fcl AS tonn,
            contracts.price_usd_per_mt_c AS priceUsdMt,
            contracts.total_usd_c AS totalPriceUsd,
            contracts.commission_group_bp AS prisgrProv,
            (SELECT po_eta FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS poEta,
            (SELECT etd FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS etd,
            contracts.customer_order_no AS customerOrderNumber,
            contracts.principal_contract_no AS principalContractNumber,
            contracts.principal_contract_date,
            contracts.principal_order_no AS principalOrderNumber,
            (SELECT container_number FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS containerNumber,
            (SELECT principal_invoice_no FROM invoices WHERE invoices.contract_id = contracts.id ORDER BY invoices.id DESC LIMIT 1) AS principalInvoiceNumber,
            (SELECT principal_invoice_date FROM invoices WHERE invoices.contract_id = contracts.id ORDER BY invoices.id DESC LIMIT 1) AS principalInvoiceDate,
            (SELECT invoice_due_date FROM invoices WHERE invoices.contract_id = contracts.id ORDER BY invoices.id DESC LIMIT 1) AS invoiceDueDate,
            (SELECT tonnes_delivered FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS tonnesDeliveres,
            (SELECT invoiced_amount_c FROM invoices WHERE invoices.contract_id = contracts.id ORDER BY invoices.id DESC LIMIT 1) AS invoiceAmount,
            (SELECT bl_date FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS blDate,
            (SELECT eta FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS eta,
            (SELECT booking_no FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS bookingNumber,
            (SELECT bl_number FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS blNumber,
            (SELECT aak_del_no FROM shipments WHERE shipments.contract_id = contracts.id ORDER BY shipments.id DESC LIMIT 1) AS aakDelNumber
          FROM contracts
          LEFT JOIN clients ON contracts.client_id = clients.id
          LEFT JOIN principals ON contracts.principal_id = principals.id
          WHERE contracts.status = 'ACTIVE'
          ORDER BY contracts.id DESC
        `;

        const result = await database.prepare(query).all();

        if (!result.success) {
          return {
            success: false,
            error: {
              code:500,
              message: "Failed to execute query",
            },
          };
        }

        const mapped: HovedListeItem[] = result.results.map((row: any): HovedListeItem => ({
          plbReference: row.plb_reference || '',
          plbOrderDate: safeDate(row.plbOrderDate),
          customer: row.customer || 'Unknown',
          product: row.product || 'Unknown',
          tonn: safeNumber(row.tonn),
          priceUsdMt: safeNumber(row.priceUsdMt),
          totalPriceUsd: safeNumber(row.totalPriceUsd),
          prisgrProv: safeNumber(row.prisgrProv),
          poEta: safeDate(row.poEta),
          etd: safeDate(row.etd),
          customerOrderNumber: row.customerOrderNumber || '',
          principalContractNumber: safeNumber(row.principalContractNumber),
          principalContractDate: safeDate(row.principal_contract_date),
          principalOrderNumber: safeNumber(row.principalOrderNumber),
          containerNumber: row.containerNumber || '',
          principalInvoiceNumber: safeNumber(row.principalInvoiceNumber),
          principalInvoiceDate: safeDate(row.principalInvoiceDate),
          invoiceDueDate: safeDate(row.invoiceDueDate),
          tonnesDeliveres: safeNumber(row.tonnesDeliveres),
          invoiceAmount: safeNumber(row.invoiceAmount),
          blDate: safeDate(row.blDate),
          eta: safeDate(row.eta),
          bookingNumber: row.bookingNumber || '',
          blNumber: row.blNumber || '',
          aakDelNumber: safeNumber(row.aakDelNumber),
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