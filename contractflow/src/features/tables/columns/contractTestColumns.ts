import { ColumnSetup } from "../interfaces/columnSetup";
import { ContractTest } from "@/app/types/contractTest";

export const contractTestColumns: ColumnSetup<ContractTest>[] = [
    {
        key: 'plbReference',
        header: 'PLB Reference',
    },
    {
        key: 'clientId',
        header: 'Client ID',
    },
    {
        key: 'productCode',
        header: 'Product Code',
    },
    {
        key: 'orderDate',
        header: 'Order Date',
        formatter: (value: string | null) => {
            if (!value) return '-';
            return new Date(value).toLocaleDateString();
        }
    },
    {
        key: 'tonnPerFcl',
        header: 'Tonnes per FCL',
        formatter: (value: number | null) => {
            if (value === null || value === undefined) return '-';
            return Number(value).toFixed(1);
        }
    },
    {
        key: 'priceUsdPerMtC',
        header: 'Price USD/MT',
        formatter: (value: number | null) => {
            if (value === null || value === undefined) return '-';
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(Number(value));
        }
    },
    {
        key: 'totalUsdC',
        header: 'Total USD',
        formatter: (value: number | null) => {
            if (value === null || value === undefined) return '-';
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(Number(value));
        }
    },
    {
        key: 'commissionGroupBp',
        header: 'Commission (BP)',
        formatter: (value: number | null) => {
            if (value === null || value === undefined) return '-';
            return `${Number(value)} BP`;
        }
    },
    {
        key: 'customerOrderNo',
        header: 'Customer Order No',
    },
    {
        key: 'principalContractNo',
        header: 'Principal Contract No',
    },
    {
        key: 'principalContractDate',
        header: 'Principal Contract Date',
        formatter: (value: string | null) => {
            if (!value) return '-';
            return new Date(value).toLocaleDateString();
        }
    },
    {
        key: 'status',
        header: 'Status',
        formatter: (value: string) => {
            const statusColors = {
                'ACTIVE': 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium',
                'INACTIVE': 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium',
                'PENDING': 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium'
            };
            const className = statusColors[value as keyof typeof statusColors] || 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
            return `<span class="${className}">${value}</span>`;
        }
    },
    {
        key: 'createdAt',
        header: 'Created At',
        formatter: (value: string) => {
            return new Date(value).toLocaleDateString();
        }
    }
];