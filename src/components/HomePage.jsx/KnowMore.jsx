import React from 'react';

const KnowMore = () => {
  return (
    <div className="mt-10 py-5">
      {/* Navigating Card to All Coins Page */}
      <div className="bg-teal-600 px-10 py-20 rounded-2xl w-full">
        <div className="flex justify-between items-center">
          <div className='w-3/5'>
            <h2 className="font-bold text-5xl text-white">Want to know More?</h2>
            <p className="mt-3 text-white text-xl">
              Stay updated with the most popular and trending coins in the
              cryptocurrency market. Dive into detailed insights, track their
              performance, and stay informed about the latest market movements
              for these high-interest assets.
            </p>
          </div>
          <button className="bg-white px-4 py-2 rounded-lg text-lg text-teal-600">
            View All Coins
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowMore;
