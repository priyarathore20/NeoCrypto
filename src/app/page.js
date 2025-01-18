import HeroSection from '@/components/HomePage.jsx/HeroSection';
import KnowMore from '@/components/HomePage.jsx/KnowMore';
import MostTradedCoins from '@/components/HomePage.jsx/MostTraded';
import TopPerformerCoins from '@/components/HomePage.jsx/TopPerformers';
import TrendingCoins from '@/components/HomePage.jsx/TrendingCoins';

export default function Home() {
  return (
    <div className="mt-10 sm:container sm:mx-auto px-5 lg:px-[60px]">
      <HeroSection />
      <TrendingCoins />
      <TopPerformerCoins />
      <MostTradedCoins />
      <KnowMore />
    </div>
  );
}
