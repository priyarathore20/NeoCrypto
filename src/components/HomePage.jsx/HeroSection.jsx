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
      <div className="relative z-10 flex lg:flex-row flex-col justify-between items-center pb-10">
        <div className="lg:flex flex-col items-center w-full lg:w-1/2 h-full">
          <h1 className="font-semibold text-5xl text-center text-white sm:text-6xl lg:text-left leading-[100%]">
            Stay Ahead with Real-Time Crypto currency Prices on{' '}
            <span className="text-teal-500">NeoCrypto</span>
          </h1>
          <p className="mt-5 text-center text-gray-300 text-xl lg:text-left">
            Track the latest trends and analyze daily, weekly, monthly, and
            yearly price charts of your favorite cryptocurrencies. Stay informed
            with the most accurate data and make smarter investment decisions
            with NeoCrypto.
          </p>
          <div className="flex justify-center lg:justify-start mt-10 w-full">
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
