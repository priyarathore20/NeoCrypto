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
    <div className="flex justify-start items-center">
      <div className="flex-[0.4]">
        <Image
          width={300}
          height={300}
          src={coin?.image?.large}
          alt={coin?.name || 'Coin image'}
          className="border-gray-300 border transition-all duration-300 ease-in hover:scale-110"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-5xl text-teal-500 capitalize">
          {coin?.name}
          <span> ({coin?.symbol?.toUpperCase()}) </span>
        </h1>
        <p className="mt-3 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default HeroSection;
