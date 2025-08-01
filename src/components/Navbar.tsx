'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavbarProps {
  hidden:boolean;
}
function Navbar({ hidden }: NavbarProps){
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Services', href: '#' },
  ];

  return (
    <nav className='bg-[#151515] w-full h-16 text-[#A1A1A1] flex justify-end items-center font-jakarta'>
      <div className='flex justify-evenly items-center w-full px-4'>
        <h1 className='text-2xl font-bold text-white'>AI Agent</h1>
        <ul className='flex items-center'>
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`inline mx-4 transition-colors ${
                  pathname === href ? 'text-[#06B67A] font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        {!hidden &&(
        <a href='/auth' className='button'>
          Create Account
        </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;