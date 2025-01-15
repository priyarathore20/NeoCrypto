import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className="relative flex justify-center items-center border-gray-800 bg-transparent shadow-[25px_25px_75px_rgba(0,0,0,0.55)] border rounded-full w-36 h-36 overflow-hidden">
        <div className="absolute inset-5 border-gray-700 bg-transparent shadow-inner-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)] border border-dashed rounded-full"></div>
        <div className="absolute border-gray-700 shadow-inner-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)] border border-dashed rounded-full w-12 h-12"></div>
        <span className="top-1/2 left-1/2 absolute border-white bg-transparent border-t border-dashed w-1/2 h-full transform origin-top-left animate-[radar81_2s_linear_infinite]">
          <span className="top-0 left-0 absolute bg-green-600 drop-shadow-[20px_20px_20px_seagreen] blur-[30px] w-full h-full transform origin-top-left filter rotate-[-55deg]"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
