// src/db/schema/files.table.ts
import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const filesTable = pgTable('files', {
  id: serial('id').primaryKey(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  fileSize: integer('file_size').notNull(),
  contentType: varchar('content_type', { length: 100 }),
  r2Url: varchar('r2_url', { length: 500 }),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
  userId: varchar('user_id', { length: 100 }), // if you have user auth
});