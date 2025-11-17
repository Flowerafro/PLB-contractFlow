import { getDb } from '@/db/index';
import { contracts } from '@/db/schema/schema';
import { ContractTest } from '@/app/types/contractTest';
import { eq, desc } from 'drizzle-orm';

export const contractTestRepository = {
    async findMany(): Promise<{ success: boolean; data: ContractTest[] | null; error?: string }> {
        try {
            const db = getDb();
            const result = await db
                .select()
                .from(contracts)
                .orderBy(desc(contracts.createdAt));

            // Transform database result to match our ContractTest interface
            const transformedData: ContractTest[] = result.map(row => ({
                id: row.id,
                plbReference: row.plbReference,
                clientId: row.clientId,
                principalId: row.principalId,
                productCode: row.productCode,
                orderDate: row.orderDate,
                tonnPerFcl: row.tonnPerFcl,
                priceUsdPerMtC: row.priceUsdPerMtC,
                totalUsdC: row.totalUsdC,
                commissionGroupBp: row.commissionGroupBp,
                customerOrderNo: row.customerOrderNo,
                principalContractNo: row.principalContractNo,
                principalContractDate: row.principalContractDate,
                principalOrderNo: row.principalOrderNo,
                status: row.status,
                createdAt: row.createdAt,
            }));

            return {
                success: true,
                data: transformedData
            };
        } catch (error) {
            console.error('Repository error:', error);
            return {
                success: false,
                data: null,
                error: 'Failed to fetch contracts from database'
            };
        }
    },

    async findById(id: number): Promise<{ success: boolean; data: ContractTest | null; error?: string }> {
        try {
            const db = getDb();
            const result = await db
                .select()
                .from(contracts)
                .where(eq(contracts.id, id))
                .limit(1);

            if (result.length === 0) {
                return {
                    success: false,
                    data: null,
                    error: 'Contract not found'
                };
            }

            const row = result[0];
            const transformedData: ContractTest = {
                id: row.id,
                plbReference: row.plbReference,
                clientId: row.clientId,
                principalId: row.principalId,
                productCode: row.productCode,
                orderDate: row.orderDate,
                tonnPerFcl: row.tonnPerFcl,
                priceUsdPerMtC: row.priceUsdPerMtC,
                totalUsdC: row.totalUsdC,
                commissionGroupBp: row.commissionGroupBp,
                customerOrderNo: row.customerOrderNo,
                principalContractNo: row.principalContractNo,
                principalContractDate: row.principalContractDate,
                principalOrderNo: row.principalOrderNo,
                status: row.status,
                createdAt: row.createdAt,
            };

            return {
                success: true,
                data: transformedData
            };
        } catch (error) {
            console.error('Repository error:', error);
            return {
                success: false,
                data: null,
                error: 'Failed to fetch contract from database'
            };
        }
    }
};