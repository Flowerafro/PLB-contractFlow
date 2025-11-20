import { ContractTest } from '../../../app/types/contractTest';

export interface ContractTestService {
    getContractTestData(): Promise<ContractTest[]>;
    getContractTestById(id: number): Promise<ContractTest | null>;
}

function getSampleData(): ContractTest[] {
    return [
        {
            id: 1,
            plbReference: 'PLB-2025-001',
            clientId: 1,
            principalId: 1,
            productCode: 'WHEAT-001',
            orderDate: '2025-01-15',
            tonnPerFcl: 25,
            priceUsdPerMtC: 32500,
            totalUsdC: 812500,
            commissionGroupBp: 150,
            customerOrderNo: 'ACME-PO-2025-001',
            principalContractNo: null,
            principalContractDate: null,
            principalOrderNo: null,
            status: 'ACTIVE',
            createdAt: '2025-11-09 17:04:28',
        },
        {
            id: 2,
            plbReference: 'PLB-2025-002',
            clientId: 2,
            principalId: 1,
            productCode: 'CORN-002',
            orderDate: '2025-01-20',
            tonnPerFcl: 30,
            priceUsdPerMtC: 28000,
            totalUsdC: 840000,
            commissionGroupBp: 200,
            customerOrderNo: 'GMT-PO-2025-001',
            principalContractNo: null,
            principalContractDate: null,
            principalOrderNo: null,
            status: 'ACTIVE',
            createdAt: '2025-11-13 19:54:43',
        }
    ];
}

function createContractTestService(): ContractTestService {
    return {
        async getContractTestData(): Promise<ContractTest[]> {
            try {
                // Check if we're in a browser environment (client-side)
                if (typeof window !== 'undefined') {
                    // Try to fetch from API endpoint
                    try {
                        const response = await fetch('/api/v1/contractTest/');
                        if (response.ok) {
                            const result = await response.json() as { success: boolean; data?: ContractTest[] };
                            if (result.success && Array.isArray(result.data)) {
                                return result.data;
                            }
                        }
                    } catch (apiError) {
                        console.log('API call failed, falling back to sample data:', apiError);
                    }
                }

                // Return sample data as fallback (for development/testing)
                console.log('Using sample data for development');
                return getSampleData();
            } catch (error) {
                console.error('Service error, falling back to sample data:', error);
                return getSampleData();
            }
        },

        async getContractTestById(id: number): Promise<ContractTest | null> {
            try {
                // Check if we're in a browser environment (client-side)
                if (typeof window !== 'undefined') {
                    try {
                        const response = await fetch(`/api/v1/contractTest/${id}`);
                        if (response.ok) {
                            const result = await response.json() as { success: boolean; data?: ContractTest };
                            if (result.success && result.data) {
                                return result.data;
                            }
                        }
                    } catch (apiError) {
                        console.log('API call failed:', apiError);
                        return getSampleData().find(contract => contract.id === id) || null;
                    }
                }

                // Return sample data as fallback
                return getSampleData().find(contract => contract.id === id) || null;
            } catch (error) {
                console.error('Service error:', error);
                return getSampleData().find(contract => contract.id === id) || null;
            }
        }
    };
}

export const contractTestService = createContractTestService();