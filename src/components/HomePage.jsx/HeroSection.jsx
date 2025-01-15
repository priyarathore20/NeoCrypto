import React from 'react';
import AnimatedCoin from '../UI/AnimatedCoin';
import Squares from '../UI/BgAnimation';
import Button from '../UI/Button';

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Animation */}
      <div className="-z-10 absolute inset-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#2c2c2c"
          hoverFillColor="#00bcd4"
          squareSize={50}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex justify-between items-center px-10 pb-10">
        <div className="w-1/2">
          <h1 className="font-semibold text-7xl text-white leading-[100%]">
            Stay Ahead with Real-Time Cryptocurrency Prices on{' '}
            <span className="text-teal-500">NeoCrypto</span>
          </h1>
          <p className="mt-5 text-gray-300 text-xl">
            Track the latest trends and analyze daily, weekly, monthly, and
            yearly price charts of your favorite cryptocurrencies. Stay informed
            with the most accurate data and make smarter investment decisions
            with NeoCrypto.
          </p>
          <div className="mt-10">
            <Button href="/top-performers" label="Learn More" />
          </div>
        </div>

        {/* Animated Coin */}
        <div className="flex flex-1 justify-center items-center">
          <AnimatedCoin />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
