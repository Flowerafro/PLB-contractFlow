import { db } from '../core/config';
import { auditLog, clients } from '../schema/schema';
import { auditLogSchema, type AuditLogData } from '../validation/schemas';
import { eq, and, desc } from 'drizzle-orm';

/**
 * Audit Service - Tracks all database changes as per report requirements
 * Logs all CRUD operations with timestamps, user context, and data changes
 */
export class AuditService {
  
  /**
   * Log an INSERT operation
   */
  static async logInsert(
    tableName: string, 
    recordId: number, 
    newData: Record<string, any>, 
    userId?: number
  ) {
    return this.createAuditEntry({
      tableName,
      recordId,
      operation: 'INSERT',
      userId,
      oldData: undefined,
      newData: JSON.stringify(newData)
    });
  }

  /**
   * Log an UPDATE operation with old and new values
   */
  static async logUpdate(
    tableName: string, 
    recordId: number, 
    oldData: Record<string, any>, 
    newData: Record<string, any>, 
    userId?: number
  ) {
    return this.createAuditEntry({
      tableName,
      recordId,
      operation: 'UPDATE',
      userId,
      oldData: JSON.stringify(oldData),
      newData: JSON.stringify(newData)
    });
  }

  /**
   * Log a DELETE operation
   */
  static async logDelete(
    tableName: string, 
    recordId: number, 
    oldData: Record<string, any>, 
    userId?: number
  ) {
    return this.createAuditEntry({
      tableName,
      recordId,
      operation: 'DELETE',
      userId,
      oldData: JSON.stringify(oldData),
      newData: undefined
    });
  }

  /**
   * Create audit log entry with validation
   */
  private static async createAuditEntry(auditData: Omit<AuditLogData, 'timestamp'>) {
    try {
      // Validate audit data before insertion
      const validatedData = auditLogSchema.parse(auditData);
      
      const [result] = await db.insert(auditLog).values({
        tableName: validatedData.tableName,
        recordId: validatedData.recordId,
        operation: validatedData.operation,
        userId: validatedData.userId,
        oldData: validatedData.oldData,
        newData: validatedData.newData
      }).returning();

      return result;
    } catch (error) {
      console.error('Audit logging failed:', error);
      // Don't throw - audit failures shouldn't break business operations
      return null;
    }
  }

  /**
   * Get audit trail for a specific record
   */
  static async getAuditTrail(tableName: string, recordId: number) {
    return await db.select()
      .from(auditLog)
      .where(
        and(
          eq(auditLog.tableName, tableName),
          eq(auditLog.recordId, recordId)
        )
      )
      .orderBy(desc(auditLog.timestamp));
  }

  /**
   * Get audit trail for a user
   */
  static async getUserAuditTrail(userId: number, limit = 50) {
    return await db.select()
      .from(auditLog)
      .where(eq(auditLog.userId, userId))
      .orderBy(desc(auditLog.timestamp))
      .limit(limit);
  }

  /**
   * Get recent audit entries across all tables
   */
  static async getRecentAuditEntries(limit = 100) {
    return await db.select()
      .from(auditLog)
      .orderBy(desc(auditLog.timestamp))
      .limit(limit);
  }

  /**
   * Wrapper for database operations with automatic audit logging
   */
  static async withAudit<T>(
    tableName: string,
    operation: 'INSERT' | 'UPDATE' | 'DELETE',
    businessOperation: () => Promise<T>,
    getAuditData: () => { recordId: number; oldData?: any; newData?: any },
    userId?: number
  ): Promise<T> {
    try {
      const result = await businessOperation();
      const { recordId, oldData, newData } = getAuditData();

      // Log the operation
      switch (operation) {
        case 'INSERT':
          await this.logInsert(tableName, recordId, newData, userId);
          break;
        case 'UPDATE':
          await this.logUpdate(tableName, recordId, oldData, newData, userId);
          break;
        case 'DELETE':
          await this.logDelete(tableName, recordId, oldData, userId);
          break;
      }

      return result;
    } catch (error) {
      console.error(`Business operation failed for ${tableName}:`, error);
      throw error;
    }
  }
}

// Example usage functions for each table
export const ClientAuditService = {
  async createClient(clientData: any, userId?: number) {
    return AuditService.withAudit(
      'clients',
      'INSERT',
      async () => {
        // Your client creation logic here
        const [result] = await db.insert(clients).values(clientData).returning();
        return result;
      },
      () => ({ recordId: clientData.id, newData: clientData }),
      userId
    );
  }
};

// Export for use in application
export { AuditService as default };