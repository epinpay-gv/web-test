"use client";

import { useTranslations } from "next-intl";
import MasterMenu from "@/features/main/components/MasterMenu";
import BestSellers from "@/features/main/components/BestSellers";
import Campaigns from "@/features/main/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards";
import { useThemeStore } from "@/features/theme/store/useThemeStore";

export default function Home() {
  const t = useTranslations("HomePage");
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);

  // Hydration tamamlanmadan renkleri gösterme
  const bgColor = hydrated && theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const textColor = hydrated && theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen flex justify-center transition-colors ${bgColor}`}>
      <div className="w-full max-w-5xl px-4">
        <NavLinkCards/>
        <MasterMenu />
        <BestSellers />
        <Campaigns />
      </div>
    </div>
  );
}