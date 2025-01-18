'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Input from './Input';
import AnimatedNavLink from './NavLinks';

const links = [
  { href: '/top-performers', label: 'Top Performers' },
  { href: '/most-traded', label: 'Most Traded' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center md:mx-auto px-5 lg:px-[60px] py-5 text-white md:container">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.jpg" alt="logo" width={180} height={10} />
      </Link>

      {/* Menu and Search Bar Section */}
      <div className="flex flex-1 justify-end items-center gap-5 text-[17px]">
        {/* Menu Icon for mobile */}
        <div className="lg:hidden">
          <FaBars
            className="text-2xl text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* Nav Links and Search Bar */}
        <div
          className={`flex flex-1 justify-end items-center gap-3 ${
            menuOpen
              ? 'flex-col absolute top-24 right-0 z-[1000] bg-black w-full px-5 py-8 lg:p-0 lg:flex-row lg:static md:max-w-[50%] max-w-[100%]'
              : 'hidden lg:flex'
          }`}
        >
          {/* Search Component in mobile menu */}
          <div className="flex flex-1 justify-end mb-5 lg:mb-0 w-full md:w-auto">
            <Input />
          </div>

          {/* Nav links */}
          <div className="flex lg:flex-row flex-col flex-[0.1] justify-end gap-3 w-full">
            {links.map((link) => (
              <AnimatedNavLink
                key={link.href}
                href={link.href}
                className="text-white"
              >
                {link.label}
              </AnimatedNavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
