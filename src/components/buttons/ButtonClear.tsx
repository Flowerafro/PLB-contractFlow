
import React from "react";

type ButtonClearProps = {
    children: React.ReactNode;
    type?: "button";
    onClick?: () => void;
    className?: string;   
}

const buttonClearStyle = "px-3 py-2 rounded-md bg-(--btn-bg-2) text-(--btn-color-1) cursor-pointer";

export default function ButtonClear({
  children,
  onClick,
  className = "",
}: ButtonClearProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonClearStyle} ${className}`}
    >
      {children}
    </button>
  );
}