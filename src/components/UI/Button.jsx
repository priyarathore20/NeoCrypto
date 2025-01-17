import Link from 'next/link';
import React from 'react';

const Button = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="relative border-gray-100 bg-teal-500 shadow-inner px-5 py-3 border rounded-lg font-semibold text-white overflow-hidden group"
    >
      <span className="group-hover:w-full top-0 left-0 absolute border-gray-600 border-t-2 w-0 h-0 transition-all duration-200 ease"></span>
      <span className="group-hover:w-full right-0 bottom-0 absolute border-gray-600 border-b-2 w-0 h-0 transition-all duration-200 ease"></span>
      <span className="group-hover:h-full top-0 left-0 absolute bg-gray-600 w-full h-0 transition-all duration-300 delay-200 ease"></span>
      <span className="group-hover:h-full bottom-0 left-0 absolute bg-gray-600 w-full h-0 transition-all duration-300 delay-200 ease"></span>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 w-full h-full duration-300 delay-300"></span>
      <span className="group-hover:text-teal-500 relative transition-colors duration-300 delay-200 ease">
        {label}
      </span>
    </Link>
  );
};

export default Button;
