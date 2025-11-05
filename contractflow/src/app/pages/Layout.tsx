"use client";

import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import CreateContract from "./CreateContract";
import ClientOverview from "./ClientOverview";
import Dashboard from "./Dashboard";
import Tables from "./Tables";
import Archive from "./Archive";


export default function Layout({ children }: { children?: React.ReactNode }) {
  
  const [pageView, setPageView] = useState<string>("/Home");

  const handlePageView = () => {
    switch (pageView) {
      case "/create":
        return <CreateContract />;
      case "/clients":
        return <ClientOverview  />;
      case "/tables":
        return <Tables  />;
      case "/archive":
        return <Archive  />;
        default: return children ?? <Dashboard  />;
    }
  } 

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#E5E5E5" }}>
      <HeaderComponent onNavigate={(path: string) => setPageView(path)} />
      <main style={{ flex: 1, padding: 20 }}>
        {handlePageView()}
      </main>
      <Footer />
    </div>
  );
}