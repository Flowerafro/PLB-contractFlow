import React from 'react';
import DropdownMenu from './DropdownMenu';
import Logo from './Logo';

type HeaderProps = {
    onNavigate?: (path: string) => void;
}

export default function HeaderComponent({ onNavigate }: HeaderProps) {

    const options = [
        {id: 1, value: '/create', label: 'Add Contract'},
        {id: 2, value: '/tables', label: 'Tables'},
        {id: 3, value: '/archive', label: 'Archive'},
        {id: 4, value: '/clients', label: 'Clients'},
        {id: 5, value: '/logout', label: 'Log out'}
    ];

    return (
        <header className='bg-[var(--primary-color)] text-[var(--text-color-main)] w-full p-4 flex items-center justify-between'>
           <div className='flex items-center gap-2'>
            <a href="/Home">
                <Logo />
            </a>
                <p className='text-1xl font-bold'>ContractFlow</p>
           </div>
            <DropdownMenu options={options} onSelect={(path: string) => onNavigate?.(path)} />
        </header>
    );
}