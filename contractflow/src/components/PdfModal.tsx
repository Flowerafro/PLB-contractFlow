"use client";

import React from "react";
import { generateDummyPdf } from "@/lib/generateDummyPdf";

interface PdfModalProps {
  data: any;
  onClose: () => void;
}

export default function PdfModal({ data, onClose }: PdfModalProps) {
  if (!data) return null;

  const fileUrl = `/plb-contractflow-r2/${data.fullFileName}`;
//  const fileUrl = data.r2Url || data.fileUrl || "/contract-template.pdf";

  const fileExtension = data.fullFileName.split('.').pop()?.toLowerCase()

  const renderPreview = () => {
    switch (fileExtension) {
      case 'pdf':
        return (
        <iframe 
        src={fileUrl} 
        className="w-full h-full" 
      />
        );
// Potensielt sted vi kan tilføye andre filtyper
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl leading-none text-gray-600 hover:text-black z-50"
        >
          ×
        </button>

        <div className="w-full h-[70vh] border-b relative">
          {renderPreview()}
        </div>

        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-3">Document Details</h2>

          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div>
              <strong>Container:</strong>
              <p>{data.containerNo}</p>
            </div>
            <div>
              <strong>Customer:</strong>
              <p>{data.customer}</p>
            </div>
            <div>
              <strong>Product:</strong>
              <p>{data.product}</p>
            </div>
            <div>
              <strong>ETA:</strong>
              <p>{data.eta}</p>
            </div>
          </div>

          <button
            onClick={generateDummyPdf}
            className="bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Download PDF (dummy)
          </button>
        </div>

      </div>
    </div>
  );
}
/*
"use client";

import React from "react";
import { generateDummyPdf } from "@/lib/generateDummyPdf";

interface PdfModalProps {
  data: any;
  onClose: () => void;
}

export default function PdfModal({ data, onClose }: PdfModalProps) {
  if (!data) return null;

  const fileUrl = data.r2Url || data.fileUrl || "/contract-template.pdf";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl leading-none text-gray-600 hover:text-black z-50"
        >
          ×
        </button>

        <div className="w-full h-[70vh] border-b relative">
          <iframe
            src="/contract-template.pdf"
            className="w-full h-full"
          />
        </div>

        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-3">Document Details</h2>

          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div>
              <strong>Container:</strong>
              <p>{data.containerNo}</p>
            </div>
            <div>
              <strong>Customer:</strong>
              <p>{data.customer}</p>
            </div>
            <div>
              <strong>Product:</strong>
              <p>{data.product}</p>
            </div>
            <div>
              <strong>ETA:</strong>
              <p>{data.eta}</p>
            </div>
          </div>

          <button
            onClick={generateDummyPdf}
            className="bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Download PDF (dummy)
          </button>
        </div>

      </div>
    </div>
  );
}
*/