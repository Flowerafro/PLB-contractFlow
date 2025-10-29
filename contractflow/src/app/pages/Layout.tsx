"use client";

import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import CreateContract from "./CreateContract";
import ClientOverview from "./ClientOverview";
import Dashboard from "./Dashboard";


export default function Layout({ children }: { children?: React.ReactNode }) {
  
  const [pageView, setPageView] = useState<string>("/Home");

  const handlePageView = () => {
    switch (pageView) {
      case "/create":
        return <CreateContract />;
      case "/clients":
        return <ClientOverview  />;
        default: return children ?? <Dashboard  />;
    }
  } 

  return (
    <div className="relative min-h-screen flex flex-col bg-[(var(--bg-color))]">
      <HeaderComponent onNavigate={(path: string) => setPageView(path)} />
      <main className="flex-1 p-5">
        {handlePageView()}
      </main>
      <Footer />
    </div>
  );
}

/* <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#E5E5E5" }}> */