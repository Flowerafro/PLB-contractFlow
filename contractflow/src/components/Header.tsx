"use client"; 
// Denne linjen forteller Next.js at komponenten skal kjøres i nettleseren (klientside),
// ikke på serveren. Dette er nødvendig fordi vi bruker React-hooks som useState og useEffect,
// som kun fungerer i klientside-komponenter.

import { useEffect, useRef, useState } from "react";
// Vi importerer tre hooks fra React:
// useState  – brukes for å holde styr på om menyen er åpen eller lukket (tilstand).
// useEffect – brukes for å håndtere sideeffekter, som å lytte etter museklikk utenfor menyen.
// useRef    – brukes for å referere direkte til et DOM-element (her: <nav>), slik at vi kan sjekke hvor brukeren klikker.
// Vi definerer en type som beskriver strukturen til hvert meny-element.
// Dette er ikke en komponent, men en "mal" (interface) som sikrer at hvert objekt har samme form.
type MenuItem = {
  id: string;             // Unik identifikator for hvert menypunkt
  label: string;          // Teksten som vises i menyen
  href: string;           // Lenken som brukeren navigerer til ved klikk
  icon?: React.ReactNode; // Et valgfritt ikon som vises til venstre for teksten
};

// Selve Header-komponenten
export default function Header() {
  // useState brukes for å kontrollere om dropdown-menyen er åpen eller ikke.
  // Når "open" er true, vises menyen. Når den er false, er den skjult.
  const [open, setOpen] = useState(false);

  // useRef brukes for å lagre en referanse til <nav>-elementet.
  // Vi kan da sjekke senere om klikket brukeren gjorde skjedde innenfor dette elementet.
  const ref = useRef<HTMLDivElement>(null);

  // useEffect kjører etter at komponenten er tegnet på skjermen.
  // Her brukes den til å legge til og fjerne en eventlistener som lytter etter museklikk.
  // Hvis brukeren klikker utenfor menyen, skal menyen lukkes automatisk.
  useEffect(() => {
    // Funksjonen sjekker om klikket skjedde utenfor "ref"-området (altså utenfor <nav>)
    function handleOutsideClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }

    // Vi legger til eventlistener på dokumentnivå for å oppdage klikk over hele siden.
    document.addEventListener("mousedown", handleOutsideClick);

    // Når komponenten fjernes (unmount), fjernes også eventlisteneren.
    // Dette er viktig for å unngå minnelekkasjer og uønsket oppførsel.
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Denne funksjonen snur verdien av "open" mellom true og false.
  // Den brukes når brukeren klikker på hamburgerikonet for å åpne/lukke menyen.
  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  // Et objekt som samler alle stilene for de forskjellige delene av headeren.
  // Vi bruker inline-CSS her (som du ønsket), men strukturerer dem som gjenbrukbare konstante objekter.
  const styles = {
    header: {
      backgroundColor: "#1D391D", 
      color: "white",
      display: "flex",            
      alignItems: "center",      
      justifyContent: "space-between", 
      height: "64px",
      padding: "0 24px",
      position: "sticky" as const, 
      top: 0,
      zIndex: 50,                  
      borderBottom: "1px solid #1a1a1a",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: "white",
      fontWeight: 500,
      fontSize: "18px",
    },
    iconButton: {
      width: "40px",
      height: "40px",
      display: "grid",
      placeItems: "center", 
      border: "none",
      background: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "white",
    },
    dropdown: {
      position: "absolute" as const, 
      right: 0,                      
      top: "58px",
      width: "220px",
      backgroundColor: "#1e1e1e",
      border: "1px solid #333",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    },
  };

  // Liste over meny-elementer som vises når dropdown-menyen åpnes.
  // Hvert element har en unik id, en label (tekst), en lenke og et ikon.
  const menuItems: MenuItem[] = [
    {
      id: "add",
      label: "Add New Contract",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      id: "tbl",
      label: "Tables",
      href: "/tables",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      id: "arch",
      label: "Archive",
      href: "/archive",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <rect x="3" y="4" width="18" height="4" rx="1" />
          <path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4" />
        </svg>
      ),
    },
    {
      id: "clients",
      label: "Clients",
      href: "/clients",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15A8 8 0 0 0 12 4a8 8 0 0 0-7.4 11" />
        </svg>
      ),
    },
    {
      id: "logout",
      label: "Log out",
      href: "/logout",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M10 17l5-5-5-5" />
          <path d="M19 12H9" />
          <path d="M5 4v16" />
        </svg>
      ),
    },
  ];

  // Her returneres JSX – selve strukturen som vises i nettleseren.
  // Den består av en header med logo og en navigasjonsmeny med knapper og dropdown.
  return (
    <header style={styles.header}>
      {/* Venstre side: logo og navn */}
      <a href="/" style={styles.link}>
        <img
          src="/logo.svg"
          alt="ContractFlow logo"
          width={38}
          height={38}
          style={{ borderRadius: "50%" }}
        />
        <span>ContractFlow</span>
      </a>

      {/* Høyre side: søkeikon, brukerikon og menyikon */}
      <nav
        ref={ref} // referanse for å oppdage klikk utenfor
        style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}
      >
        {/* Søkeikon-knapp */}
        <button
          aria-label="Search"
          style={styles.iconButton}
          // Enkle hover-effekter som endrer bakgrunnsfarge
          onMouseEnter={(e) => (e.currentTarget.style.background = "#314c2c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-3.5-3.5" />
          </svg>
        </button>

        {/* Brukerikon-knapp */}
        <button
          aria-label="User"
          style={styles.iconButton}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#314c2c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c2-3 6-5 8-5s6 2 8 5" />
          </svg>
        </button>

        {/* Hamburgerikon-knapp som åpner/lukker menyen */}
        <button
          aria-label="Menu"
          onClick={toggleMenu}
          style={styles.iconButton}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#314c2c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* Dropdown-listen som vises når menyen er åpen */}
        {open && (
          <div style={styles.dropdown}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      if (item.id === "add") {
                        window.location.href = "/create"; // sender til CreateContract-siden
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 16px",
                      color: "white",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#2c2c2c")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
