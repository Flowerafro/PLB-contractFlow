
export default function mapShipmentData(row: any) {
    return {
        id: row.id ?? null,
        plbReference: row.plbReference ?? "",
        plbOrderDate: row.plbOrderDate ?? "",
        customer: row.customer ?? "",
        product: row.product ?? "",
        customerOrderNumber: row.customerOrderNumber ?? "",

        principalContractNumber: String(row.principalContractNumber ?? ""),
        principalContractDate: row.principalContractDate ?? "",
        principalOrderNumber: String(row.principalOrderNumber ?? ""),

        containerNumber: row.containerNumber ?? "",
        bookingNumber: row.bookingNumber ?? "",
        blNumber: row.blNumber ?? "",
        poEta: row.poEta ?? "",
        etd: row.etd ?? "",
        blDate: row.blDate ?? "",
        eta: row.eta ?? "",

        principalInvoiceNumber: String(row.principalInvoiceNumber ?? ""),
        principalInvoiceDate: row.principalInvoiceDate ?? "",
        invoiceDueDate: row.invoiceDueDate ?? "",
        invoiceAmount: row.invoiceAmount ?? 0,
    }
}