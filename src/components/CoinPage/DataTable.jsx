const DataTable = ({ fetchedCoin }) => {
  const coinDetails = [
    { key: 'Id', value: fetchedCoin.id },
    { key: 'Symbol', value: fetchedCoin.symbol.toUpperCase() },
    {
      key: 'Current Price (USD)',
      value: fetchedCoin.market_data.current_price.usd.toFixed(2),
    },
    {
      key: 'Market Cap (USD)',
      value: fetchedCoin.market_data.market_cap.usd.toLocaleString(),
    },
    { key: 'Market Cap Rank', value: fetchedCoin.market_cap_rank },
    {
      key: 'Total Volume (USD)',
      value: fetchedCoin.market_data.total_volume.usd.toLocaleString(),
    },
    {
      key: '24h High (USD)',
      value: fetchedCoin.market_data.high_24h.usd.toFixed(2),
    },
    {
      key: '24h Low (USD)',
      value: fetchedCoin.market_data.low_24h.usd.toFixed(2),
    },
    {
      key: '24h Price Change (%)',
      value: (
        <span
          className={
            fetchedCoin.market_data.price_change_percentage_24h > 0
              ? 'text-green-500'
              : 'text-red-500'
          }
        >
          {fetchedCoin.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      ),
    },
  ];

  return (
    <>
      <h3 className="mt-10 text-xl">Here's some stats about the coin :</h3>
      <table className="border-collapse mt-3 w-full table-auto">
        <thead>
          <tr>
            <th className="border-gray-500 p-5 border w-1/2 text-gray-400 text-left text-xl">
              Attribute
            </th>
            <th className="border-gray-500 p-5 border w-1/2 text-gray-400 text-left text-xl">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {coinDetails.map(({ key, value }) => (
            <tr key={key}>
              <td className="border-gray-500 p-3 border">{key}</td>
              <td className="border-gray-500 p-3 border text-teal-400">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
