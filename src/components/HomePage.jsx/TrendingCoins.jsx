'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CryptoCardSkeleton from '../UI/CryptoCardSkeleton';

const TrendingCoins = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTrendingCoins() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/search/trending'
      );
      setCoins(response.data.coins);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  return (
    <section className="flex flex-col items-center gap-10 mt-10 sm:mt-20 py-5 w-full h-full">
      <div className="font-semibold text-5xl text-center">Trending Coins</div>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {coins.slice(0, 9).map((coin) =>
          isLoading ? (
            <CryptoCardSkeleton key={coin?.item?.id} />
          ) : (
            <Link
              href={`/coins/${coin?.item?.id}`}
              key={coin?.item?.id}
              className="flex gap-4 p-5 border border-teal-200 hover:border-teal-300 rounded-2xl w-full transition-all ease-linear hover:scale-105"
            >
              <Image
                src={coin?.item?.thumb}
                width={80}
                height={80}
                alt=""
                className="rounded-xl object-cover"
              />
              <div className="flex justify-between items-start w-full">
                <div>
                  <p className="font-semibold text-xl">{coin?.item?.symbol}</p>
                  <p className="text-gray-500">
                    ${coin?.item?.data?.price.toFixed(5)}
                  </p>
                </div>
                <span
                  className={`flex ${coin?.item?.data?.price_change_percentage_24h.usd > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {Math.floor(
                    coin?.item?.data?.price_change_percentage_24h.usd * 100
                  ) / 100}{' '}
                  %
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default TrendingCoins;
