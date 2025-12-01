import React from "react";
import Hamburger from "./Hamburger";
import { logout } from "../../../app/actions/auth";

type DropdownMenuProps = {
  options: { id: number; value: string; label: string }[];
};

export default function DropdownMenu({ options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOptionClick = async (option: { id: number; value: string; label: string }) => {
    setIsOpen(false);
    
    if (option.value === "/logout") {
      const result = await logout();
      if (result.clearSession) {
        localStorage.removeItem('user_session');
      }
      if (result.clearCookie) {
    document.cookie = result.clearCookie;
      }
      if (result.redirect) {
        window.location.href = result.redirect;
      }
      return;
    }
    window.location.href = option.value;
  };

  return (
    <nav className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        <Hamburger />
      </button>

      {isOpen && (
        <ul className="bg-(--dropdown-bg) absolute top-full right-1 m-2 p-4 rounded-md shadow-md z-50">
          {options.map((option) => (
            <li key={option.id} className="p-4 hover:underline rounded-md cursor-pointer">
              <button
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
