import Image from 'next/image';
import React from 'react';
import AnimatedCoin from '../UI/AnimatedCoin';

const HeroSection = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-1/2">
        <h1 className="font-semibold text-7xl leading-[100%]">
          Stay Ahead with Real-Time Cryptocurrency Prices on{' '}
          <span className="text-teal-500">NeoCrypto</span>
        </h1>
        <p className="mt-5 text-2xl">
          Track the latest trends and analyze daily, weekly, monthly, and yearly
          price charts of your favorite cryptocurrencies. Stay informed with the
          most accurate data and make smarter investment decisions with
          NeoCrypto.
        </p>
        <button className="bg-teal-500 mt-8 px-10 py-2 rounded-lg w-fit font-semibold text-black">
          Get Started
        </button>
      </div>

      {/* Added A image */}
      <div className='flex-1'>
        {/* <Image
          src="/coin.png"
          alt="hero-image"
          width={500}
          height={500}
          crossOrigin="anonymous"
        /> */}
        <AnimatedCoin />
      </div>
    </div>
  );
};

export default HeroSection;
