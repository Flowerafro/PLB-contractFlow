CREATE TABLE `audit_log` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `table_name` text NOT NULL,
    `record_id` integer NOT NULL,
    `action` text NOT NULL,
    `user_id` integer,
    `changes` text,
    `created_at` text DEFAULT datetime('now') NOT NULL
);