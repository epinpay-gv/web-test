'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useThemeStore } from "@/features/theme/store/useThemeStore";

export default function Home() {
  const t = useTranslations("HomePage");
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);

  // Hydration tamamlanmadan renkleri gösterme
  const bgColor = hydrated && theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const textColor = hydrated && theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors ${bgColor}`}>
      HOMEPAGE
    </div>
  );
}