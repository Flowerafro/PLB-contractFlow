"use client";

import React, { useRef, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Søk...", onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className=" p-8 bg-[var(--search-bg)] rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="search" className="sr-only">{placeholder}</label>
        <input
          type="text"
          id="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search"
          className="flex-1 p-2 border-2 border-[var(--search-border)] rounded-md w-full"
        />
        <button type="submit" className="px-3 py-2 rounded-md bg-[var(--btn-bg-1)] text-[var(--btn-color-2)]">
          Søk
        </button>
        <button type="button" onClick={handleClear} className="px-3 py-2 rounded-md bg-[var(--btn-bg-2)] text-[var(--btn-color-1)]">
          Tøm
        </button>
      </div>
    </form>
  );
}

/** style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 720 }} 
 * style={{ flex: 1, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
 * 
 *  style={{ padding: 16  bg-gray-100 rounded-lg}}
 * 
 * 
*/