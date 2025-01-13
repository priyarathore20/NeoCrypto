'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const TrendingCoins = () => {
  const [coins, setCoins] = useState([]);

  async function fetchTrendingCoins() {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/search/trending'
      );
      setCoins(response.data.coins);
      console.log(response.data.coins);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  return (
    <section className="flex flex-col items-center gap-10 mt-20 py-5 w-full h-full">
      <div className="font-semibold text-5xl">Trending Coins</div>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-16 w-full">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-16 mt-5 w-full">
          {coins.slice(0, 9).map((coin) => (
            <Link
              href={`/coins/${coin?.item?.id}`}
              key={coin?.item?.id}
              className="flex gap-4 p-5 border border-teal-200 hover:border-teal-300 rounded-2xl w-full max-w-[400px] transition-all ease-linear hover:scale-105"
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
                  <p className="font-semibold text-xl">{coin?.item?.name}</p>
                  <p className="text-gray-500">
                    ${coin?.item?.data?.price.toFixed(5)}
                  </p>
                </div>
                <span
                  className={
                    coin?.item?.data?.price_change_percentage_24h.usd > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {Math.floor(
                    coin?.item?.data?.price_change_percentage_24h.usd * 100
                  ) / 100}{' '}
                  %
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/trending" className="flex items-center gap-2 text-lg">
          View more{' '}
          <span>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default TrendingCoins;
