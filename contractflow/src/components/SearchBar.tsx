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
    <form onSubmit={handleSubmit} className=" p-8 bg-(--search-bg) rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="search" className="sr-only">{placeholder}</label>
        <input
          type="text"
          id="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search"
          className="flex-1 p-2 border-2 border-(--search-border) rounded-md w-full"
        />
        <button type="submit" className="px-3 py-2 rounded-md bg-(--btn-bg-1) text-(--btn-color-2)">
          Søk
        </button>
        <button type="button" onClick={handleClear} className="px-3 py-2 rounded-md bg-(--btn-bg-2) text-(--btn-color-1)">
          Tøm
        </button>
      </div>
    </form>
  );
}
