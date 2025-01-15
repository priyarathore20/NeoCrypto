'use client';

import CoinChart from '@/components/CoinPage/CoinChart';
import DataTable from '@/components/CoinPage/DataTable';
import HeroSection from '@/components/CoinPage/HeroSection';
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
        console.log(data);
        setFetchedCoin(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [coin]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto mt-10 py-5 container">
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
