"use client";

import MasterMenu from "@/features/main/components/MasterMenu";
import BestSellers from "@/features/main/components/BestSellers";
import Campaigns from "@/features/main/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import Section from "@/components/layout/Section/Section";

export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);

  // Hydration tamamlanmadan renkleri gösterme
  const bgColor = hydrated && theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const textColor = hydrated && theme === 'dark' ? 'text-gray-300' : 'text-gray-600';


  return (
    <>
      <Section>
        <NavLinkCards />
        <MasterMenu />
      </Section>

      <Section backgroundClassName="bg-(--bg-brand-softer)">
        <BestSellers />
      </Section>

      <Section>
        <Campaigns />
      </Section>
    </>
  );
}