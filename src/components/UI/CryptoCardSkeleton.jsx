const CryptoCardSkeleton = ({ coin }) => {
  return (
    <div className="flex gap-4 p-5 border border-teal-200 hover:border-teal-300 rounded-2xl w-full max-w-[400px] transition-all ease-linear hover:scale-105">
      <img
        src={coin?.image}
        width="80"
        height="80"
        alt=""
        className="rounded-xl object-cover"
      />

      <div className="flex justify-between items-start w-full">
        <div className="space-y-2">
          {/* Name skeleton */}
          <div className="bg-gray-200 rounded-md w-24 h-6 animate-pulse" />
          {/* Price skeleton */}
          <div className="bg-gray-200 rounded-md w-20 h-5 animate-pulse" />
        </div>

        {/* Percentage change skeleton */}
        <div className="bg-gray-200 rounded-md w-16 h-5 animate-pulse" />
      </div>
    </div>
  );
};

export default CryptoCardSkeleton;
