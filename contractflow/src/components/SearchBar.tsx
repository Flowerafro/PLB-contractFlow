"use client";

import React, { useRef, useState } from "react";
import type { SearchBarProps } from "../app/types/searchItem";
import { InputWithLabel } from "./InputWithLabel";
import Button from "./Button";
import ButtonClear from "./ButtonClear";


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
        <fieldset className="w-full">
        <InputWithLabel value={value} onChange={handleChange} label={placeholder} type="text" name="search" id="search" />
        </fieldset>
        <Button type="submit">Søk</Button>
        <ButtonClear onClick={handleClear}>Tøm</ButtonClear>
      </div>
    </form>
  );
}
