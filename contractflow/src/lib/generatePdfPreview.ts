import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePdfPreview(record: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Archive Document", {
    x: 50,
    y: 760,
    size: 22,
    font,
    color: rgb(0, 0, 0),
  });

  let y = 720;
  const step = 22;

  function add(field: string, value: any) {
    page.drawText(`${field}: ${value || ""}`, {
      x: 50,
      y,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    y -= step;
  }

  add("Container", record.containerNo);
  add("Customer", record.customer);
  add("Product", record.product);
  add("ETA", record.eta);
  add("Filename", record.fullFileName);
  add("Size", record.size);
  add("Date", record.date);

  // IMPORTANT: return a DATA URI instead of Blob
  const dataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  return dataUri; // iframe can render this under CSP 'self'
}
