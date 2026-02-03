"use client";

import { useState } from "react";
import { ThemeToggle } from "@/features/theme/components/ThemeToggle";
import { Button } from "@/components/common/Button/Button";
import Image from "next/image";
import { SearchInput } from "@/features/search/index";
import { LocaleDropdown } from "./components/LocaleDropdown";
import { UserDropdown } from "./components/UserDropdown";
import { CartButton } from "../../../features/cart/components/CartButton";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { NotificationDropdown } from "@/features/notifications/components/NotificationDropdown";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react"; // Mobil ikonlar için

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <header className="relative border-b border-gray-200 dark:border-(--border-default) bg-white dark:bg-(--bg-neutral-primary-soft) transition-colors h-16 md:h-22 flex items-center z-50">
      {/* Background Glow Vector */}
      <div className="absolute w-193.5 h-166 -left-60.5 -top-76 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />
      <div className="max-w-7xl w-full mx-auto px-4 flex justify-between items-center gap-4 md:gap-8 z-10">
        
        {/* LOGO ALANI */}
        <Link href="/" className="shrink-0">
          <Image
            src="/image/logos/epinpay-lg.png"
            alt="Epinpay"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* MASAÜSTÜ ARAMA (Desktop only) */}
        <div className="hidden md:block max-w-lg flex-1">
          <SearchInput />
        </div>

        {/* AKSİYON ALANI */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Mobil Arama Tetikleyici (Mobile only) */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-(--text-body) hover:bg-(--bg-neutral-tertiary) rounded-md"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Masaüstü Araçlar (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            <LocaleDropdown />
            <ThemeToggle />
          </div>

          {/* Giriş Durumu Kontrolü */}
          {!isLogin ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block">
                <Button variant="secondary" text="Giriş Yap" appearance="outline" padding="sm" />
              </Link>
              <Button variant="brand" text="Satıcı ol" padding="sm" className="hidden xs:block" />
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-3">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <CartButton />
              <NotificationDropdown />
              <UserDropdown user={user!} onLogout={logout} />
            </div>
          )}

          {/* MOBİL MENÜ BUTONU (Hamburger) */}
          <button className="lg:hidden p-2 text-(--text-body) hover:bg-(--bg-neutral-tertiary) rounded-md">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBİL ARAMA ÇUBUĞU (Overlay) */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white dark:bg-(--bg-neutral-primary-soft) flex items-center px-4 md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex-1">
            <SearchInput />
          </div>
          <button onClick={() => setIsSearchOpen(false)} className="ml-4 p-2 text-red-500">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </header>
  );
}