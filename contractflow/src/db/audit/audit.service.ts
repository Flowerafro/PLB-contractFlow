import { db } from "../config";
import { auditLog } from "./audit_log.table";

type AuditOperation = 'INSERT' | 'UPDATE' | 'DELETE';

export class AuditService {
  static async log(
    tableName: string,
    rowId: number,
    operation: AuditOperation,
    userId?: number,
    oldData?: Record<string, any>,
    newData?: Record<string, any>
  ) {
    try {
      await db.insert(auditLog).values({
        tableName,
        rowId,
        operation,
        userId,
        oldData: oldData ? JSON.stringify(oldData) : null,
        newData: newData ? JSON.stringify(newData) : null,
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      throw error;
    }
  }
}