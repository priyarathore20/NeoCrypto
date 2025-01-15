'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const TopPerforming = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('24'); // Default filter set to 24 hours

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

  const fetchTopPerformers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_${filter}h_desc&per_page=50&sparkline=false&price_change_percentage=24h,7d,30d,1y`
      );
      setCoins(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTopPerformers();
  }, [fetchTopPerformers]);

  // Filter coins based on search term
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get price change based on selected filter
  const getPriceChange = (coin) => {
    switch (filter) {
      case '24':
        return coin.price_change_percentage_24h;
      case '168': // 7 days
        return coin.price_change_percentage_7d_in_currency;
      case '720': // 30 days
        return coin.price_change_percentage_30d_in_currency;
      case '8760': // 1 year
        return coin.price_change_percentage_1y_in_currency;
      default:
        return coin.price_change_percentage_24h;
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-red-500">
          <p className="font-semibold text-xl">Error loading data</p>
          <p className="mt-2">{error}</p>
          <button
            onClick={fetchTopPerformers}
            className="bg-teal-500 hover:bg-teal-600 mt-4 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 px-4 container">
      <h1 className="font-semibold text-3xl text-center text-teal-400 md:text-5xl">
        Top Performing Coins
      </h1>

      {/* Search and Filter */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-10">
        <div className="relative md:flex-[0.3] w-full">
          <input
            type="text"
            placeholder="Search coin"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-700 bg-gradient-to-r from-black/90 to-black/95 px-5 py-2 border rounded-2xl w-full animate-border outline-none"
          />
          <span className="top-3.5 right-3 absolute">
            <FaSearch className="w-4 h-4 fill-gray-400" />
          </span>
        </div>

        <div className="flex md:flex-[0.5] justify-end w-full">
          <select
            className="border-gray-700 bg-transparent p-2 border rounded-md w-full max-w-56 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="24">24 Hours</option>
            <option value="168">7 Days</option>
            <option value="720">30 Days</option>
            <option value="8760">1 Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p>Loading...</p>
          </div>
        ) : filteredCoins.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-400 text-lg">
              No coins found matching your search.
            </p>
          </div>
        ) : (
          <table className="bg-gray-900 shadow-lg rounded-lg w-full text-gray-200">
            <thead>
              <tr className="border-gray-950 border-b">
                <th className="px-4 py-3 text-left">Coin</th>
                <th className="text-right px-4 py-3">Price</th>
                <th className="text-right px-4 py-3">Change in %</th>
                <th className="text-right px-4 py-3">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
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
                      getPriceChange(coin) > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {getPriceChange(coin)?.toFixed(2)}%
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
    </div>
  );
};

export default TopPerforming;
