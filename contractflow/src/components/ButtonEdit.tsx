import React from "react";

interface ButtonEditProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button";
}

export function ButtonEdit({children, onClick, type = "button"} : ButtonEditProps) {
    return (
        <button type={type} onClick={onClick} className="bg-black text-white px-4 py-2 rounded-md shadow hover:bg-gray-900 transition cursor-pointer">{children}</button>
    )
}