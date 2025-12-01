-- Global search view for contracts, clients, principals, shipments and invoices
-- Evt brukes i dashboard
CREATE VIEW IF NOT EXISTS v_search AS
SELECT 
    c.id as contract_id,
    c.plb_reference,
    c.product_code,
    c.customer_order_no,
    cl.id as client_id,
    cl.name as client_name,
    cl.customer_code,
    p.id as principal_id,
    p.name as principal_name,
    s.id as shipment_id,
    s.container_number,
    s.booking_no,
    s.bl_number,
    i.id as invoice_id,
    i.principal_invoice_no,
    c.created_at as contract_created,
    s.eta as shipment_eta
FROM contracts c
LEFT JOIN clients cl ON c.client_id = cl.id
LEFT JOIN principals p ON c.principal_id = p.id
LEFT JOIN shipments s ON s.contract_id = c.id
LEFT JOIN invoices i ON i.contract_id = c.id;
