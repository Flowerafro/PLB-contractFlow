"use client";

import Footer from "@/components/global/pageSections/Footer";
import HeaderComponent from "@/components/global/pageSections/HeaderComponent";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)]">
      <HeaderComponent />

      <main className="flex-1 p-5">
        {children}
      </main>

      <Footer />
    </div>
  );
}