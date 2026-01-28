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
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl text-red-700 dark:text-red-500 font-bold transition-colors">
          {t("title")}
        </h1>
        <p className={`text-xl transition-colors ${textColor}`}>
          {t("description")}
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}