import { z } from 'zod';

// Base validation schemas as per report requirements
const currencyInCentsSchema = z.number().int().min(0, "Currency amount must be non-negative");
const dateISOSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in ISO format (YYYY-MM-DD)");
const statusSchema = z.enum(["ACTIVE", "INACTIVE", "CANCELLED"]);
const shipmentStatusSchema = z.enum(["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"]);
const invoiceStatusSchema = z.enum(["PENDING", "SENT", "PAID", "OVERDUE", "CANCELLED"]);

// Client validation - as per report specs
export const clientSchema = z.object({
  name: z.string().min(1, "Client name is required").max(255),
  customerCode: z.string().max(50).optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().max(20).optional(),
  country: z.string().max(100).optional(),
  status: statusSchema.default("ACTIVE")
});

// Principal validation
export const principalSchema = z.object({
  name: z.string().min(1, "Principal name is required").max(255)
});

// Contract validation - with currency in cents
export const contractSchema = z.object({
  plbReference: z.string().min(1, "PLB reference is required").max(50),
  clientId: z.number().int().positive("Valid client ID is required"),
  principalId: z.number().int().positive().optional(),
  productCode: z.string().max(50).optional(),
  orderDate: dateISOSchema.optional(),
  tonnPerFcl: z.number().positive("Tonnage must be positive").optional(),
  priceUsdPerMtC: currencyInCentsSchema.default(0), // Price in cents
  totalUsdC: currencyInCentsSchema.default(0), // Total in cents
  commissionGroupBp: z.number().int().min(0).max(10000, "Commission cannot exceed 100%").optional(), // Basis points
  customerOrderNo: z.string().max(100).optional(),
  principalContractNo: z.string().max(100).optional(),
  principalContractDate: dateISOSchema.optional(),
  principalOrderNo: z.string().max(100).optional(),
  status: statusSchema.default("ACTIVE")
});

// Shipment validation
export const shipmentSchema = z.object({
  contractId: z.number().int().positive("Valid contract ID is required"),
  containerNumber: z.string().max(20).optional(),
  bookingNo: z.string().max(50).optional(),
  blNumber: z.string().max(50).optional(),
  aakDelNo: z.string().max(50).optional(),
  poEta: dateISOSchema.optional(),
  etd: dateISOSchema.optional(),
  blDate: dateISOSchema.optional(),
  eta: dateISOSchema.optional(),
  tonnesDelivered: z.number().positive("Tonnes delivered must be positive").optional(),
  status: shipmentStatusSchema.default("PENDING")
});

// Invoice validation - with currency
export const invoiceSchema = z.object({
  contractId: z.number().int().positive("Valid contract ID is required"),
  principalInvoiceNo: z.string().max(100).optional(),
  principalInvoiceDate: dateISOSchema.optional(),
  invoiceDueDate: dateISOSchema.optional(),
  invoicedAmountC: currencyInCentsSchema.default(0), // Amount in cents 
  status: invoiceStatusSchema.default("PENDING")
});

// Audit log validation
export const auditLogSchema = z.object({
  tableName: z.string().min(1, "Table name is required"),
  recordId: z.number().int().positive("Valid record ID is required"),
  operation: z.enum(["INSERT", "UPDATE", "DELETE"]),
  userId: z.number().int().positive().optional(),
  oldData: z.string().optional(), // JSON string of old values
  newData: z.string().optional()  // JSON string of new values
});

// Helper functions for currency conversion
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function centsToDollars(cents: number): number {
  return cents / 100;
}

// Validation helper function
export function validateAndFormat<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.issues.map((e: any) => e.message).join(', ')}`);
  }
  return result.data;
}

// Type exports for use in application
export type ClientData = z.infer<typeof clientSchema>;
export type PrincipalData = z.infer<typeof principalSchema>;
export type ContractData = z.infer<typeof contractSchema>;
export type ShipmentData = z.infer<typeof shipmentSchema>;
export type InvoiceData = z.infer<typeof invoiceSchema>;
export type AuditLogData = z.infer<typeof auditLogSchema>;