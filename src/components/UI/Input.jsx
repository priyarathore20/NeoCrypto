'use client';
import { debounce } from '@/utils/helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TbXboxX } from 'react-icons/tb';

const Input = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const fetchSearchedCoins = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      setSearchResults(response?.data?.coins || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debounceForSearch = useCallback(
    debounce((query) => fetchSearchedCoins(query), 500),
    []
  );

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debounceForSearch(query);
  };

  const handleCoinClick = (coinId) => {
    router.push(`/coins/${coinId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  // Add the event listener manually on the first render
  if (!inputRef.current) {
    document.addEventListener('mousedown', handleClickOutside);

    // Attach cleanup logic directly to the ref for safe removal
    inputRef.current = {
      cleanup: () => {
        document.removeEventListener('mousedown', handleClickOutside);
      },
    };
  }

  // Clean up the event listener when the component unmounts
  if (inputRef.current?.cleanup) {
    const existingCleanup = inputRef.current.cleanup;
    const originalUnmount = inputRef.current.unmount || (() => {});

    inputRef.current.unmount = () => {
      existingCleanup();
      originalUnmount();
    };
  }

  return (
    <div ref={inputRef} className="relative flex justify-end w-full">
      <input
        type="text"
        placeholder="Search coin"
        className="border-gray-700 bg-gradient-to-r from-black/90 to-black/95 px-5 py-2 border rounded-2xl w-full max-w-[500px] animate-border outline-none"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <span className="top-3.5 right-3 absolute cursor-pointer">
        {searchQuery.length > 0 ? (
          <TbXboxX
            className="w-5 h-5 text-gray-400"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          />
        ) : (
          <FaSearch className="w-4 h-4 fill-gray-400" />
        )}
      </span>

      {/* Display search results */}
      <div className="top-12 z-50 absolute bg-gray-900 shadow-lg rounded-lg w-full max-w-[500px]">
        {loading && <p className="p-3 text-gray-400">Loading...</p>}
        {!loading && searchResults.length > 0 && (
          <ul>
            {searchResults.slice(0, 10).map((coin) => (
              <li
                key={coin.id}
                onClick={() => handleCoinClick(coin.id)}
                className="flex items-center gap-3 hover:bg-gray-700 p-3 text-gray-200 transition-all duration-200 cursor-pointer ease-in"
              >
                <span className="border-gray-400 p-1 border rounded-full">
                  <FaSearch className="w-3 h-3 fill-gray-400" />
                </span>{' '}
                <p>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </p>
              </li>
            ))}
          </ul>
        )}
        {!loading && searchQuery && searchResults.length === 0 && (
          <p className="p-3 text-gray-400">No coins found.</p>
        )}
      </div>
    </div>
  );
};

export default Input;
