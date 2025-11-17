
"use client";

import Footer from "../../components/Footer";
import HeaderComponent from "../../components/HeaderComponent";

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

/* relative h-full min-h-full flex flex-col bg-[var(--bg-color)] */