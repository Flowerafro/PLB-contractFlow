import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateDummyPdf() {

  const existingPdfBytes = await fetch("/contract-template.pdf").then(res =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.getPages()[0];

  page.drawText("CONTAINER: MSCU1234567", { x: 60, y: 710, size: 12, font });
  page.drawText("CUSTOMER: Dummy Company AS", { x: 60, y: 690, size: 12, font });
  page.drawText("PRODUCT: Dummy Product", { x: 60, y: 670, size: 12, font });
  page.drawText("ETA: 2025-12-01", { x: 60, y: 650, size: 12, font });

  page.drawText("Sender: John Testsen", { x: 60, y: 500, size: 12, font });
  page.drawText("Receiver: Kari Dummy", { x: 60, y: 480, size: 12, font });
  page.drawText("Carrier: Maersk Dummy", { x: 60, y: 460, size: 12, font });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "dummy-contract.pdf";
  link.click();

  URL.revokeObjectURL(url);
}
