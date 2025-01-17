import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="mx-auto mt-16 sm:px-0 xs:px-5 py-5 container">
      {/* Footer logo image */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-8 mb-5">
        <div>
          <Image src="/logo.jpg" alt="logo" width={150} height={100} />
        </div>

        {/* Footer links */}
        <div className="flex gap-5 text-center">
          <Link href={'/'} className="text-gray-100">
            About Us
          </Link>
          <Link href={'/'} className="text-gray-100">
            Contact Us
          </Link>
          <Link href={'/'} className="text-gray-100">
            Privacy Policy
          </Link>
          <Link href={'/'} className="text-gray-100">
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Footer line */}
      <div className="bg-gray-800 w-full h-0.5"></div>

      {/* Footer text */}

      <div className="mt-5 text-center text-gray-100">
        <p>
          © 2025 <span className="text-teal-400">NeoCrypto</span>. All Rights
          Reserved.
        </p>
        <p>
          All data is for informational purposes only. Please do your own
          research before making financial decisions.
        </p>
      </div>
    </div>
  );
};

export default Footer;
