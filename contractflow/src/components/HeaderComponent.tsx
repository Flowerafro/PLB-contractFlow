import React from "react";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";

export default function HeaderComponent() {
  const options = [
    { id: 1, value: "/Home", label: "Dashboard" },
    { id: 2, value: "/create", label: "Add Contract" },
    { id: 3, value: "/tables", label: "Tables" },
    { id: 4, value: "/archive", label: "Archive" },
    { id: 5, value: "/clients", label: "Clients" },
    { id: 6, value: "/logout", label: "Log out" }
  ];

  return (
    <header className="bg-(--primary-color) text-(--text-color-main) w-full p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <a href="/Home">
          <Logo />
        </a>
        <p className="text-xl font-bold">ContractFlow</p>
      </div>

      <DropdownMenu options={options} />
    </header>
  );
}