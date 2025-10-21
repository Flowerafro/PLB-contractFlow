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
    <form onSubmit={handleSubmit} style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 720 }}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search"
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
        />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, backgroundColor: "#767676", color: "#fff", border: "none" }}>
          Søk
        </button>
        <button type="button" onClick={handleClear} style={{ padding: "8px 12px", borderRadius: 6, backgroundColor: "#ccc", color: "#1E1E1E", border: "none" }}>
          Tøm
        </button>
      </div>
    </form>
  );
}