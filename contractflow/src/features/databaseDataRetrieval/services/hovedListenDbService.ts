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
            throw new Error('Could not fetch data');
        }
    }
}
export const hovedListenDbService = new HovedListenDbService();
