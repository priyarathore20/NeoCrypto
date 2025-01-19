'use client';

import CoinChart from '@/components/CoinPage/CoinChart';
import DataTable from '@/components/CoinPage/DataTable';
import HeroSection from '@/components/CoinPage/HeroSection';
import Loader from '@/components/UI/Loader';
import { useParams } from 'next/navigation'; // useParams hook for dynamic routes
import { useEffect, useState } from 'react';

const CoinDetail = () => {
  const [fetchedCoin, setFetchedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { coin } = useParams(); // Dynamically extract 'coin' from the URL

  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (!coin) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}`
        );
        const data = await response.json();
        setFetchedCoin(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [coin]);

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center w-screen h-scree">
        Error: Too many requests
      </div>
    );

  return (
    <div className="md:mx-auto mt-10 px-5 md:px-0 md:container">
      {fetchedCoin && (
        <>
          <HeroSection coin={fetchedCoin} />
          <div className="bg-gray-800 mt-10 w-full h-0.5"></div>

          {/* Add a chart here */}
          <CoinChart coin={fetchedCoin.id} />

          {/* Add a table here */}
          <DataTable fetchedCoin={fetchedCoin} />
        </>
      )}
    </div>
  );
};

export default CoinDetail;
