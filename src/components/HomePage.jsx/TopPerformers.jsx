'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CryptoCardSkeleton from '../UI/CryptoCardSkeleton';

const TopPerformerCoins = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTopPerformers() {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_desc'
      );
      const data = await response.data;

      setCoins(data);
    } catch (error) {
      console.error('Error fetching top performers:', error);
    }
  }

  useEffect(() => {
    fetchTopPerformers();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <h1 className="mt-10 font-bold text-5xl text-center">Top Performers</h1>
      </div>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 w-full">
        {coins.slice(0, 9).map((coin, i) =>
          isLoading ? (
            <CryptoCardSkeleton key={i} />
          ) : (
            <Link
              href={`/coins/${coin?.id}`}
              key={coin?.id}
              className="flex gap-4 p-5 border border-teal-200 hover:border-teal-300 rounded-2xl w-full transition-all ease-linear hover:scale-105"
            >
              <Image
                src={coin?.image}
                width={80}
                height={80}
                alt=""
                className="rounded-xl object-cover"
              />
              <div className="flex justify-between items-start w-full">
                <div>
                  <p className="font-semibold text-xl">{coin?.name}</p>
                  <p className="text-gray-500">${coin?.current_price}</p>
                </div>
                <span
                  className={
                    coin?.price_change_percentage_24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {Math.floor(coin?.price_change_percentage_24h * 100) / 100} %
                </span>
              </div>
            </Link>
          )
        )}
      </div>

      <Link
        href="/top-performers"
        className="flex justify-center items-center gap-2 mt-16 text-lg"
      >
        View more{' '}
        <span>
          <FaArrowRight />
        </span>
      </Link>
    </div>
  );
};

export default TopPerformerCoins;
