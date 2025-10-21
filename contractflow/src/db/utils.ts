import { SQL } from 'drizzle-orm';
import { db } from './index';

export interface PaginationParams {
  cursor?: number;
  limit?: number;
  orderBy?: string;
}

export async function paginatedQuery<T>(
  query: SQL<T>,
  { cursor = 0, limit = 50, orderBy }: PaginationParams
) {
  const results = await db.all(query);
  return {
    data: results,
    nextCursor: cursor + limit,
    hasMore: results.length === limit
  };
}

export async function safeTransaction(operation: (tx: any) => Promise<any>): Promise<any> {
  try {
    return await db.transaction(async (tx: any) => {
      return await operation(tx);
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}