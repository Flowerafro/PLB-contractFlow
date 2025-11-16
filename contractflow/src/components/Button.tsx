

import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, type = "button", onClick, className }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={`bg-[var(--primary-color)] text-white px-4 py-2 rounded cursor-pointer ${className}`}>{children}</button>
    )
}