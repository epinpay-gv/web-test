// anasayfa/page.tsx
"use client";

import MasterMenu from "@/features/mainpage/components/MasterMenu";
import BestSellers from "@/features/mainpage/bestsellers/components/BestSellers";
import Campaigns from "@/features/mainpage/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards";
import Section from "@/components/layout/Section/Section";
import PremiumSection from "@/features/mainpage/components/PremiumSection";

export default function Home() {
  // NOT: Artık manuel bgColor/textColor değişkenlerine ihtiyacın yok.
  // Section bileşenlerinin içindeki CSS sınıflarında "dark:bg-slate-900" 
  // gibi Tailwind classları kullanman yeterli.

  return (
    <>
      {/* <Section backgroundClassName="bg-[#081D28] border-b"> */}
        <NavLinkCards />
      {/* </Section> */}

      <Section>
        <MasterMenu />
      </Section>

      <Section backgroundClassName="bg-(--bg-brand-softer) dark:bg-slate-900/50">
        <BestSellers />
      </Section>

      <Section>
        <Campaigns />
      </Section>

      <Section backgroundClassName="bg-[linear-gradient(263.8deg,#F9D697_0.55%,#FFE7DD_24.87%,#BFC3D2_89.38%,#FFDBAD_97.8%)] dark:opacity-90">
        <PremiumSection />
      </Section>
    </main>
  );
}
