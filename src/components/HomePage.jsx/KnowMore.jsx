import React from 'react';
import Button from '../UI/Button';

const KnowMore = () => {
  return (
    <div className="mt-10 px-5 py-5 w-full">
      {/* Navigating Card to All Coins Page */}
      <div className="border-gray-700 bg-gradient-to-r from-black/90 to-black/95 shadow-lg shadow-teal-200 px-10 py-20 border rounded-2xl w-full">
        <div className="flex lg:flex-row flex-col justify-between items-center gap-5">
          <div className='w-full lg:w-3/5'>
            <h2 className="font-bold text-5xl text-center text-teal-500 lg:text-left">Want to know More?</h2>
            <p className="mt-3 text-center text-teal-500 lg:text-left">
              Stay updated with the most popular and trending coins in the
              cryptocurrency market. Dive into detailed insights, track their
              performance, and stay informed about the latest market movements
              for these high-interest assets.
            </p>
          </div>
          <Button href={'top-performers'} label={'Explore coins'}/>
        </div>
      </div>
    </div>
  );
};

export default KnowMore;
