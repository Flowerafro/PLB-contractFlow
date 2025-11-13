
import React from 'react';
import Hamburger from './Hamburger';


type DropdownMenuProps = {
    options: { id: number; value: string; label: string }[];
    onSelect?: (value: string) => void;
}

export default function DropdownMenu({ options, onSelect }: DropdownMenuProps) {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav>
            <button onClick={() => setIsOpen((prev) => !prev)} className='cursor-pointer'>
                <Hamburger />
            </button>
            {isOpen && (
                <ul className='bg-(--dropdown-bg) absolute right-0 m-2 p-4 rounded-md shadow-md'>
                    {options.map((option) => (
                        <li key={option.id} onClick={() => {onSelect?.(option.value); setIsOpen(false);}} className='p-4 hover:underline rounded-md cursor-pointer'>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}