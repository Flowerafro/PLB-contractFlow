import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1),
  customerCode: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
});

export const contractSchema = z.object({
  plbReference: z.string().min(1),
  clientId: z.number().positive(),
  principalId: z.number().positive().optional(),
  productCode: z.string().optional(),
  orderDate: z.string().datetime().optional(),
  tonnPerFcl: z.number().positive().optional(),
  priceUsdPerMtC: z.number().min(0),
  totalUsdC: z.number().min(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
});

// Add other validation schemas for remaining tables