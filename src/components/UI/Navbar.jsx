import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const LinkClass =
  'border-b-2 border-transparent hover:border-white transition duration-300';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center mx-auto py-5 text-white container">
      {/* Add the Image component */}
      <Link href="/">
        <Image src="/logo.jpg" alt="logo" width={180} height={10} />
      </Link>

      <div className="flex flex-[0.5] justify-end items-center gap-5 text-[17px]">
        {/* Add the Search component */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search coin"
            className="border-gray-700 bg-gradient-to-r from-black/90 to-black/95 px-5 py-2 border rounded-2xl w-full max-w-[500px] animate-border outline-none"
          />
          <span className="top-3.5 right-3 absolute">
            <FaSearch className="w-4 h-4 fill-gray-400" />
          </span>
        </div>

        {/* Add the Nav links component */}
        <Link href="/" className={LinkClass}>
          Home
        </Link>
        <Link href="/trending" className={LinkClass}>
          Trending
        </Link>
        <Link href="/coins" className={LinkClass}>
          Coins
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
