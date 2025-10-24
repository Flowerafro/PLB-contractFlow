"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
// Search and detail view moved into Dashboard page

interface SearchItem {
  id: number;
  name: string;
  client: string;
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  // Layout no longer contains search state; move search to Dashboard

  return (
    <div style={{ 
      position: "relative",  
      width: '100%', 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      backgroundColor: "#E5E5E5" }}>
      <Header />
      <main style={{ 
        flex: 1, padding: 20 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}