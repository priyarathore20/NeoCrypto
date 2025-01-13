'use client';
import React, { useEffect, useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const AnimatedCoin = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparklePositions, setSparklePositions] = useState([]);

  // Generate random sparkle positions
  useEffect(() => {
    const positions = Array.from({ length: 5 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
    setSparklePositions(positions);
  }, []);

  return (
    <div className="flex justify-center items-center p-8 w-full min-h-[400px]">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main coin circle */}
        <div
          className={`
          w-[350px] h-[350px] rounded-full 
          bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500
          shadow-lg 
          transition-all duration-500 ease-in-out
          flex items-center justify-center
          ${isHovered ? 'scale-110 shadow-yellow-500/50' : 'scale-100'}
        `}
        >
          {/* Outer ring */}
          <div
            className={`
            absolute inset-0 rounded-full 
            border-4 border-yellow-300/30
            animate-[spin_8s_linear_infinite]
          `}
          />

          {/* Dollar symbol */}
          <FiDollarSign
            className={`
              w-24 h-24 text-yellow-100
              transition-all duration-500
              ${isHovered ? 'scale-125' : 'scale-100'}
            `}
          />

          {/* Animated sparkles */}
          {sparklePositions.map((pos, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animation: `sparkle 2s infinite ${pos.delay}s`,
              }}
            >
              <HiOutlineSparkles
                className={`
                  w-6 h-6 text-yellow-200
                  animate-pulse
                `}
                style={{
                  transform: `scale(${pos.scale})`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Price indicator */}
        <div
          className={`
          absolute -bottom-16 left-1/2 -translate-x-1/2
          text-center transition-all duration-500
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        >
          <p className="font-bold text-xl text-yellow-400">$1,234.56</p>
          <p className="text-green-400 text-sm">+5.67%</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCoin;
