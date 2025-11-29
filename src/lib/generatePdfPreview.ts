import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePdfPreview(fullContract: Record<string, any>) {
    const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);  // ← endret fra const til let
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Contract Details", {
    x: 50,
    y: 760,
    size: 22,
    font,
    color: rgb(0, 0, 0),
  });

  let y = 720;
  const step = 18;

  for (const [field, value] of Object.entries(fullContract)) {
    page.drawText(`${field}: ${value ?? ""}`, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    y -= step;

    if (y < 60) {
      page = pdfDoc.addPage([600, 800]); // nå lov siden page = let
      y = 760;
    }
  }

  return await pdfDoc.saveAsBase64({ dataUri: true });
}
