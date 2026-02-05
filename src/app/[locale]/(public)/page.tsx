"use client";

import MasterMenu from "@/features/mainpage/components/MasterMenu";
import BestSellers from "@/features/mainpage/bestsellers/components/BestSellers";
// import Campaigns from "@/features/mainpage/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards";
import { useThemeStore } from "@/features/theme/store/useThemeStore"; 
import PremiumSection from "@/features/mainpage/components/PremiumSection";

export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);

  // Hydration tamamlanmadan renkleri gösterme
  const bgColor = hydrated && theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const textColor = hydrated && theme === 'dark' ? 'text-gray-300' : 'text-gray-600';


  return (
    <>
      <NavLinkCards />
      <MasterMenu />
      <BestSellers />
      {/* <Campaigns /> */}
      <PremiumSection />
      
    </>
  );
}
