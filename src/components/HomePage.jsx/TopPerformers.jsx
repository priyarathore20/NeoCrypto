'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const TopPerformerCoins = () => {
  const [coins, setCoins] = useState([]);
  const [positiveCoins, setPositiveCoins] = useState([]);
  const [negativeCoins, setNegativeCoins] = useState([]);

  async function fetchTopPerformers() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_desc'
      );
      const data = await response.json();

      const positiveCoins = data.filter(
        (coin) => coin.price_change_percentage_24h > 0
      );
      setPositiveCoins(positiveCoins);

      const negativeCoins = data.filter(
        (coin) => coin.price_change_percentage_24h < 0
      );
      setNegativeCoins(negativeCoins);

      console.log(data);
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
      <div className="flex justify-center items-center mt-10 py-5">
        <h1 className="mt-10 font-bold text-5xl">Top Performers</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-16 mt-5 w-full">
        {coins.slice(0, 9).map((coin) => (
          <div
            key={coin?.item?.id}
            className="flex gap-4 p-5 border border-teal-200 hover:border-teal-300 rounded-2xl w-full max-w-[400px] transition-all ease-linear hover:scale-105"
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
                <p className="text-gray-500">${coin?.market_cap}</p>
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
          </div>
        ))}
        <Link
          href="/top-performers"
          className="flex items-center gap-2 text-lg"
        >
          View more{' '}
          <span>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopPerformerCoins;
