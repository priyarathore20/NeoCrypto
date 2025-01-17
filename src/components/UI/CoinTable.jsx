'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Format market cap with proper notation
const formatMarketCap = (marketCap) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(marketCap);
};

// Format price with proper decimal places
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);
};

const CoinTable = ({ coins, filter, getPriceChange }) => {
  return (
    <div className="mt-10 overflow-x-auto">
      {coins.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-400 text-lg">
            No coins found matching your search.
          </p>
        </div>
      ) : (
        <table className="bg-gray-900 shadow-lg rounded-lg w-full text-gray-200">
          <thead>
            <tr className="border-gray-950 border-b align-middle">
              <th className="px-4 py-5 text-left">Coin name</th>
              <th className="text-right px-4 py-5">Price (USD)</th>
              <th className="text-right px-4 py-5">Change in %</th>
              <th className="text-right px-4 py-5">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="border-gray-800 last:border-0 hover:bg-gray-950 border-b transition-all duration-300"
              >
                <td className="px-4 py-3 text-left">
                  <Link
                    href={`/coins/${coin.id}`}
                    className="flex items-center group"
                  >
                    <div className="relative mr-3 w-10 h-10">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        fill
                        className="rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-coin.png'; // Make sure to add this image
                        }}
                      />
                    </div>
                    <div>
                      <p className="group-hover:text-teal-400 font-medium transition-colors">
                        {coin.name}
                      </p>
                      <p className="text-gray-400 text-sm uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="text-right px-4 py-3">
                  {formatPrice(coin.current_price)}
                </td>
                <td
                  className={`text-right py-3 px-4 font-semibold ${
                    getPriceChange(coin) > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {getPriceChange(coin)}%
                </td>
                <td className="text-right px-4 py-3">
                  {formatMarketCap(coin.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoinTable;
