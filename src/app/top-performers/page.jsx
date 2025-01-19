'use client';
import CoinTable from '@/components/UI/CoinTable';
import Loader from '@/components/UI/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const TopPerforming = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('24'); // Default filter set to 24 hours

  const fetchTopPerformers = async () => {
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
  };

  useEffect(() => {
    fetchTopPerformers();
  }, []);

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
    <div className="md:mx-auto mt-10 px-5 md:px-0 md:container">
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
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <CoinTable
            coins={filteredCoins}
            filter={filter}
            getPriceChange={getPriceChange}
          />
        )}
      </div>
    </div>
  );
};

export default TopPerforming;
