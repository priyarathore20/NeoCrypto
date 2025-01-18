'use client';

import axios from 'axios'; // Import axios
import { useEffect, useState } from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Loader from '../UI/Loader';

const CoinChart = ({ coin }) => {
  const [priceData, setPriceData] = useState(null);
  const [timeframe, setTimeframe] = useState('365'); // Default to 1 day timeframe
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch price change data for chart
  useEffect(() => {
    const fetchPriceData = async () => {
      if (!coin) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timeframe}`
        );
        const chartData = response.data.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp),
          price,
        }));

        // Group data by date/time/month to show only one entry per period
        const groupedData = groupDataByTimeframe(chartData, timeframe);

        setPriceData(groupedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [coin, timeframe]);

  const groupDataByTimeframe = (data, timeframe) => {
    const grouped = {};

    data.forEach((entry) => {
      const date = entry.time;
      let key;

      if (timeframe === '1') {
        // For 1 day, group by hour
        key = date.getHours();
      } else if (timeframe === '7') {
        // For 7 days, group by day
        key = `${date.getDay()}-${date.getDate()}`;
      } else if (timeframe === '30' || timeframe === '365') {
        // For 30 and 365 days, group by month and date
        key = `${date.getMonth()}-${date.getDate()}`;
      }

      // Keep the last price for each time period (you can adjust this logic)
      if (!grouped[key]) {
        grouped[key] = entry;
      } else {
        // Optionally: average or pick the latest data point
        grouped[key].price = entry.price;
      }
    });

    return Object.values(grouped);
  };

  const formatXAxis = (tick) => {
    const date = new Date(tick);

    if (timeframe === '1') {
      // For 1 day: Show hours (e.g., 1 AM, 2 AM)
      return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    } else if (timeframe === '7') {
      // For 7 days: Show day of the week and date (e.g., Mon 1, Tue 2)
      return `${date.toLocaleString('en-US', {
        weekday: 'short',
      })} ${date.getDate()}`;
    } else if (timeframe === '30' || timeframe === '365') {
      // For 30 and 365 days: Show month and date (e.g., Jan 1, Jan 2)
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center gap-5 p-4 text-center">
        <div>Error: {error.message}</div>
        <button
          onClick={() => setTimeframe(timeframe)}
          className="bg-red-500 px-6 py-2 rounded-md text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-10">
      <h1 className="mt-10 font-semibold text-2xl md:text-4xl">
        Graphical Representation
      </h1>

      {/* Chart Display */}
      <div className="mt-16 w-full h-96">
        {loading ? (
          <Loader />
        ) : (
          priceData && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                {/* X-Axis with Time label */}
                <XAxis
                  dataKey="time"
                  tickFormatter={formatXAxis}
                  tick={{ stroke: '#4CAF50', strokeWidth: 0.1 }}
                  tickMargin={10}
                />
                {/* Y-Axis with Price (USD) label */}
                <YAxis tick={{ stroke: '#4CAF50', strokeWidth: 0.1 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'black',
                    color: 'white',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                  wrapperStyle={{
                    zIndex: 10,
                  }}
                  position={{ x: 10, y: -10 }}
                />

                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )
        )}
      </div>

      {/* Chart buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={() => setTimeframe('1')}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
            timeframe === '1' ? 'bg-teal-500' : 'bg-teal-900 hover:bg-teal-700'
          }`}
        >
          1 Day
        </button>
        <button
          onClick={() => setTimeframe('7')}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
            timeframe === '7' ? 'bg-teal-500' : 'bg-teal-900 hover:bg-teal-700'
          }`}
        >
          7 Days
        </button>
        <button
          onClick={() => setTimeframe('30')}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
            timeframe === '30' ? 'bg-teal-500' : 'bg-teal-900 hover:bg-teal-700'
          }`}
        >
          30 Days
        </button>
        <button
          onClick={() => setTimeframe('365')}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
            timeframe === '365'
              ? 'bg-teal-500'
              : 'bg-teal-900 hover:bg-teal-700'
          }`}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default CoinChart;
