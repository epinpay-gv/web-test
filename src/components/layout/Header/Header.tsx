"use client";
import { useState } from "react";
import { ThemeToggle } from "@/features/theme/components/ThemeToggle";
import { Button, IconShape } from "@/components/common";
import Image from "next/image";
import { SearchInput } from "@/features/search/index";
import { LocaleDropdown } from "./components/LocaleDropdown";
import { UserDropdown } from "./components/UserDropdown";
import { CartButton } from "../../../features/cart/components/CartButton";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { NotificationDropdown } from "@/features/notifications/components/NotificationDropdown";
import { X } from "lucide-react";
import { Search } from "flowbite-react-icons/outline";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"


export function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const themeSuffix = resolvedTheme === "light" ? "black" : "white"
  const sizeSuffix = isMobile ? "xs" : "lg"
  const logoSrc = `/image/logos/epinpay-${themeSuffix}-${sizeSuffix}.png`
  return (
    <header className="relative border-b border-gray-200 dark:border-(--border-default) bg-white dark:bg-(--bg-neutral-primary-soft) transition-colors h-16 md:h-22 flex items-center z-50 overflow-visible">
      {/* Background Glow Vector */}
      <div className="absolute max-lg:hidden w-193.5 h-166 -left-60.5 -top-76 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />
      <div className="max-w-7xl w-full mx-auto px-4 flex justify-between items-center gap-4 md:gap-8 z-10">
        
        {/* LOGO ALANI */}
        <button onClick={() => router.push("/")} className="shrink-0">
          <Image
            src={logoSrc}
            alt="Epinpay"
            width={isMobile ? 120 : 298}
            height={isMobile ? 32 : 40}
            className="h-6 md:h-10 w-auto object-contain cursor-pointer"
            priority
          />
        </button>

        {/* MASAÜSTÜ ARAMA (Desktop only) */}
        <div className="hidden md:block max-w-lg flex-1">
          <SearchInput />
        </div>

        {/* AKSİYON ALANI */}
        <div className="flex items-center justify-end md:gap-4">
          
          {/* Mobil Arama Tetikleyici (Mobile only) */}
          {/* <Button 
            variant="ghost"
            
            icon={<Search className="w-4 h-4 md:w-5 md:h-5"/>}
            padding="xs"
            className="md:hidden"
          /> */}

          <IconShape 
            icon={Search} 
            color="custom" 
            customColor="var(--text-heading)" 
            variant="square" 
            size="lg" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          />
          
          {/* Masaüstü Araçlar (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            <LocaleDropdown />
          </div>
          <div className="flex items-center lg:gap-4">
            <ThemeToggle />
            <CartButton />
          </div>
          {/* Giriş Durumu Kontrolü */}
          {!isLogin ? (
            <div className="flex items-center lg:gap-2">
              <Button variant="secondary" text="Giriş Yap" appearance="filled" padding="sm" onClick={() => router.push('/login')} />
              <Button variant="brand" text="Satıcı ol" padding="sm" className="hidden xs:block" />
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-3">

              
              <div className="hidden">
              <NotificationDropdown />
              </div>
              <div className="relative">
                <UserDropdown user={user!} onLogout={logout} />
              </div>
            </div>
          )}

          
        </div>
      </div>

      {/* MOBİL ARAMA ÇUBUĞU (Overlay) */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-21 bg-white dark:bg-(--bg-neutral-primary-soft) flex items-center px-4 md:hidden animate-in fade-in slide-in-from-top-2">
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