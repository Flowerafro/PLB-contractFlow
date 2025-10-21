CREATE INDEX `idx_contracts_order_date` ON `contracts` (`order_date`);
CREATE INDEX `idx_shipments_container_number` ON `shipments` (`container_number`);
CREATE INDEX `idx_shipments_eta` ON `shipments` (`eta`);
CREATE INDEX `idx_contracts_client_id` ON `contracts` (`client_id`);
CREATE INDEX `idx_contracts_principal_id` ON `contracts` (`principal_id`);