import { eq, like, or, desc, gt, lt, sql } from 'drizzle-orm';
import { db } from '../core/config';
import { clients, contracts, shipments, invoices, principals } from '../schema/schema';

// Pagination interface
export interface PaginationParams {
  cursor?: number;
  limit?: number;
  orderBy?: string;
  direction?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  nextCursor?: number;
  hasMore: boolean;
  total?: number;
}

// Cursor-based pagination for large datasets
export async function paginatedQuery<T>(
  table: any,
  params: PaginationParams = {},
  whereConditions?: any
): Promise<PaginationResult<T>> {
  const { cursor = 0, limit = 50, direction = 'desc' } = params;
  
  // Build query conditionally to avoid TypeScript reassignment issues
  let baseQuery = db.select().from(table);
  
  const conditions = [];
  
  // Apply where conditions if provided
  if (whereConditions) {
    conditions.push(whereConditions);
  }
  
  // Apply cursor-based filtering
  if (cursor > 0) {
    conditions.push(
      direction === 'desc' 
        ? lt(table.id, cursor)
        : gt(table.id, cursor)
    );
  }
  
  // Build final query
  const finalQuery = conditions.length > 0 
    ? baseQuery.where(conditions.length === 1 ? conditions[0] : sql`${conditions.join(' AND ')}`)
    : baseQuery;
  
  const results = await finalQuery
    .orderBy(direction === 'desc' ? desc(table.id) : table.id)
    .limit(limit + 1); // +1 to check if there are more results
  const hasMore = results.length > limit;
  const data = hasMore ? results.slice(0, -1) : results;
  const nextCursor = hasMore && data.length > 0 ? data[data.length - 1].id : undefined;
  
  return {
    data: data as T[],
    nextCursor,
    hasMore
  };
}

// ACID transaction wrapper
export async function safeTransaction<T>(operation: (tx: any) => Promise<T>): Promise<T> {
  try {
    return await db.transaction(async (tx: any) => {
      // All operations within this block are ACID compliant
      return await operation(tx);
    });
  } catch (error) {
    console.error('ACID transaction failed, rolling back:', error);
    throw error;
  }
}

// Client operations with pagination support
export async function getClientById(id: number) {
  const result = await db.select().from(clients).where(eq(clients.id, id));
  return result[0] || null;
}

export async function searchClients(searchTerm: string, pagination?: PaginationParams) {
  const whereCondition = or(
    like(clients.name, `%${searchTerm}%`),
    like(clients.customerCode, `%${searchTerm}%`),
    like(clients.email, `%${searchTerm}%`)
  );
  
  if (pagination) {
    return paginatedQuery(clients, pagination, whereCondition);
  }
  
  return await db.select().from(clients)
    .where(whereCondition)
    .orderBy(desc(clients.createdAt));
}

export async function getAllClients(pagination?: PaginationParams) {
  if (pagination) {
    return paginatedQuery(clients, pagination);
  }
  return await db.select().from(clients).orderBy(desc(clients.createdAt));
}

// Contract operations with pagination
export async function getContractById(id: number) {
  const result = await db.select().from(contracts).where(eq(contracts.id, id));
  return result[0] || null;
}

export async function getContractsByClientId(clientId: number, pagination?: PaginationParams) {
  const whereCondition = eq(contracts.clientId, clientId);
  
  if (pagination) {
    return paginatedQuery(contracts, pagination, whereCondition);
  }
  
  return await db.select().from(contracts)
    .where(whereCondition)
    .orderBy(desc(contracts.createdAt));
}

export async function getAllContracts(pagination?: PaginationParams) {
  if (pagination) {
    return paginatedQuery(contracts, pagination);
  }
  return await db.select().from(contracts).orderBy(desc(contracts.createdAt));
}

// Shipment operations with pagination
export async function getShipmentsByContractId(contractId: number, pagination?: PaginationParams) {
  const whereCondition = eq(shipments.contractId, contractId);
  
  if (pagination) {
    return paginatedQuery(shipments, pagination, whereCondition);
  }
  
  return await db.select().from(shipments)
    .where(whereCondition)
    .orderBy(desc(shipments.createdAt));
}

export async function getAllShipments(pagination?: PaginationParams) {
  if (pagination) {
    return paginatedQuery(shipments, pagination);
  }
  return await db.select().from(shipments).orderBy(desc(shipments.createdAt));
}

// Invoice operations with pagination
export async function getInvoicesByContractId(contractId: number, pagination?: PaginationParams) {
  const whereCondition = eq(invoices.contractId, contractId);
  
  if (pagination) {
    return paginatedQuery(invoices, pagination, whereCondition);
  }
  
  return await db.select().from(invoices)
    .where(whereCondition)
    .orderBy(desc(invoices.createdAt));
}

export async function getAllInvoices(pagination?: PaginationParams) {
  if (pagination) {
    return paginatedQuery(invoices, pagination);
  }
  return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
}

// Principal operations
export async function getDefaultPrincipal() {
  const result = await db.select().from(principals)
    .where(eq(principals.name, 'AAK'))
    .limit(1);
  return result[0] || null;
}

export async function getAllPrincipals() {
  return await db.select().from(principals).orderBy(desc(principals.createdAt));
}

// Global search using the v_search view
export async function globalSearch(searchTerm: string, pagination?: PaginationParams) {
  const searchPattern = `%${searchTerm}%`;
  
  const searchResults = await db.all(sql`
    SELECT * FROM v_search 
    WHERE 
      plb_reference LIKE ${searchPattern} OR
      client_name LIKE ${searchPattern} OR
      principal_name LIKE ${searchPattern} OR
      container_number LIKE ${searchPattern} OR
      principal_invoice_no LIKE ${searchPattern} OR
      product_code LIKE ${searchPattern} OR
      customer_order_no LIKE ${searchPattern}
    ORDER BY contract_created DESC
    ${pagination ? sql`LIMIT ${pagination.limit || 50}` : sql``}
  `);
  
  return searchResults;
}

// Bulk operations with transaction support
export async function bulkInsertWithTransaction<T>(
  table: any,
  data: T[],
  batchSize = 100
): Promise<T[]> {
  return await safeTransaction(async (tx: any) => {
    const results: T[] = [];
    
    // Process in batches for large datasets
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const batchResults = await tx.insert(table).values(batch).returning();
      results.push(...batchResults);
    }
    
    return results;
  });
}