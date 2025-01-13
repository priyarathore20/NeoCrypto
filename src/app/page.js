import HeroSection from '@/components/HomePage.jsx/HeroSection';
import KnowMore from '@/components/HomePage.jsx/KnowMore';
import MostTradedCoins from '@/components/HomePage.jsx/MostTraded';
import TopPerformerCoins from '@/components/HomePage.jsx/TopPerformers';
import TrendingCoins from '@/components/HomePage.jsx/TrendingCoins';

export default function Home() {
  return (
    <div className="px-16 mt-10">
      <HeroSection />
      <TrendingCoins />
      <TopPerformerCoins />
      <MostTradedCoins />
      <KnowMore />
    </div>
  );
}
