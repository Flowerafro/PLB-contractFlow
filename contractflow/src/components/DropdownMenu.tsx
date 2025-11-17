import React from "react";
import Hamburger from "./Hamburger";

type DropdownMenuProps = {
  options: { id: number; value: string; label: string }[];
};

export default function DropdownMenu({ options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        <Hamburger />
      </button>

      {isOpen && (
        <ul className="bg-(--dropdown-bg) absolute right-0 m-2 p-4 rounded-md shadow-md z-50">
          {options.map((option) => (
            <li key={option.id} className="p-4 hover:underline rounded-md cursor-pointer">
              <a
                href={option.value}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
