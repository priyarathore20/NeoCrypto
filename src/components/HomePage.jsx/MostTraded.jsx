'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

function MostTradedCoins() {
  const [coins, setCoins] = useState([]);

  async function fetchMostTradedCoins() {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=9&page=1'
      );
      const data = await response.data;

      // Only show coins with non-zero trading volume
      const mostTradedCoins = data.filter((coin) => coin.total_volume > 0);

      setCoins(mostTradedCoins);
    } catch (error) {
      console.error('Error fetching most traded coins:', error);
    }
  }

  useEffect(() => {
    fetchMostTradedCoins();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10 py-5">
        <h1 className="mt-10 font-bold text-5xl">Most Traded</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-16 mt-5 w-full">
        {coins.slice(0, 9).map((coin, i) => (
          <div
            key={coin?.item?.id || i}
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
                <p className="text-gray-500">
                  ${coin?.current_price.toFixed(2)}
                </p>
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
      </div>
      <Link href="/top-performers" className="flex justify-center items-center gap-2 mt-16 text-lg">
        View more{' '}
        <span>
          <FaArrowRight />
        </span>
      </Link>
    </div>
  );
}

export default MostTradedCoins;
