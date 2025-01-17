import Image from 'next/image';
import React from 'react';

const HeroSection = ({ coin }) => {
  const truncateDescription = (description) => {
    if (!description) {
      return 'Unfortunately, no description is currently available for this coin.';
    }

    const sentences = description.split('. '); // Split into sentences
    let truncated = '';
    for (const sentence of sentences) {
      if ((truncated + sentence).split(/\s+/).length > 120) break; // Check word count after adding a sentence
      truncated += sentence.trim() + '. ';
    }

    return (
      truncated.trim() ||
      'Unfortunately, no description is currently available for this coin.'
    );
  };

  const description = truncateDescription(coin?.description?.en);

  return (
    <div className="flex lg:flex-row flex-col justify-start items-center gap-8 py-5">
      <div className="flex-[0.4] mb-5 lg:mb-0">
        <Image
          width={300}
          height={300}
          src={coin?.image?.large || '/placeholder-image.png'}
          alt={coin?.name || 'Coin image'}
          className="border-gray-300 border rounded-md w-full h-auto transition-all duration-300 ease-in hover:scale-110"
        />
      </div>

      <div className="flex-1">
        <h1 className="font-semibold text-3xl text-teal-500 sm:text-4xl lg:text-5xl capitalize">
          {coin?.name || 'Unknown Coin'}
          <span> ({coin?.symbol?.toUpperCase() || 'N/A'}) </span>
        </h1>
        <p className="mt-3 text-base sm:text-lg lg:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default HeroSection;
