// anasayfa/page.tsx
"use client";

import MasterMenu from "@/features/mainpage/components/MasterMenu";
import BestSellers from "@/features/mainpage/bestsellers/components/BestSellers";
// import Campaigns from "@/features/mainpage/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards"; 
import PremiumSection from "@/features/mainpage/premium/components/PremiumSection";

export default function Home() {
  // NOT: Artık manuel bgColor/textColor değişkenlerine ihtiyacın yok.
  // Section bileşenlerinin içindeki CSS sınıflarında "dark:bg-slate-900" 
  // gibi Tailwind classları kullanman yeterli.

  return (
      <>
      <NavLinkCards />
      <MasterMenu />
      <BestSellers />
      {/* <Campaigns /> */}

      {/* PremiumSection (şimdilik) sadece ekran genişliği md ve üzeri boyutlarda görünecek. */}
      <PremiumSection />
    </>
  );
}
