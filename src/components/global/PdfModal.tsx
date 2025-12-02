"use client";
// Modal for PDF preview via iframe, viser tilgjengelig filinformasjon.

import React from "react";

interface PdfModalProps {
  data: any;
  onClose: () => void;
}

export default function PdfModal({ data, onClose }: PdfModalProps) {
  if (!data) return null;

  const fileUrl = data.previewUrl;

  const renderPreview = () => (
    <iframe
      src={fileUrl}
      className="w-full h-full"
    />
  );
  
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
        <h2 className="text-xl font-bold mb-3">File Details</h2>
        <p><strong>Filename:</strong> {data.fullFileName}</p>
        <p><strong>Size:</strong> {data.size} bytes</p>
        <p><strong>Uploaded:</strong> {data.uploaded}</p>
      </div>

      </div>
    </div>
  );
}
