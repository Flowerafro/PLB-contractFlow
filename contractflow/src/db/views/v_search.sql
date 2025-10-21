-- View for globalt søk på tvers av kontrakt/kunde/container/faktura må gjøres om til TS
CREATE VIEW IF NOT EXISTS v_search AS
SELECT
  c.id            AS contract_id,
  c.plb_reference,
  cl.name         AS client_name,
  p.name          AS principal_name,
  s.container_number,
  i.principal_invoice_no
FROM contracts c
LEFT JOIN clients cl     ON c.client_id = cl.id
LEFT JOIN principals p   ON c.principal_id = p.id
LEFT JOIN shipments s    ON s.contract_id = c.id
LEFT JOIN invoices i     ON i.contract_id = c.id;
