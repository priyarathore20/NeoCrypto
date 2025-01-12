import HeroSection from '@/components/HomePage.jsx/HeroSection';
import TopPerformerCoins from '@/components/HomePage.jsx/TopPerformers';
import TrendingCoins from '@/components/HomePage.jsx/TrendingCoins';

export default function Home() {
  return (
    <div className="px-16 mt-10">
      <HeroSection />
      <TrendingCoins />
      <TopPerformerCoins />
    </div>
  );
}
