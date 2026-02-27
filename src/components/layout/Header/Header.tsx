/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/features/theme/components/ThemeToggle";
import { Button, IconShape } from "@/components/common";
import Image from "next/image";
import { SearchInput } from "@/features/search/index";
import { LocaleDropdown } from "./components/LocaleDropdown";
import { UserDropdown } from "./components/UserDropdown";
import { CartButton } from "../../../features/cart/components/CartButton";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { NotificationDropdown } from "@/features/notifications/components/NotificationDropdown";
import { X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
// ✅ Yeni AuthDropdown bileşenini import ediyoruz
import { AuthDropdown } from "@/features/auth/components/AuthDropdown"; 

export function Header() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  // State'ler
  // const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrate = useAuthStore((state) => state.hydrate);

  // Hydration hatasını önlemek için mounted kontrolü
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const themeSuffix = resolvedTheme === "light" ? "black" : "white";
  const logoSrc = `/logos/epinpay-${themeSuffix}-lg.png`;

  // Sayfa sunucuda render edilirken login durumunu henüz bilmediğimiz için
  // butonu göstermeden önce istemciye geçişi (mounted) bekliyoruz.
  // if (!mounted) {
  //   return (
  //     <header className="h-16 md:h-22 border-b border-gray-200 dark:border-(--border-default) bg-white dark:bg-(--bg-neutral-primary-soft)" />
  //   );
  // }

  return (
    <>
      <header className="relative border-b border-gray-200 dark:border-(--border-default) bg-white dark:bg-(--bg-neutral-primary-soft) transition-colors h-16 md:h-22 flex items-center z-50 overflow-visible">
        {/* Arka Plan Parlama Efekti */}
        <div className="absolute max-lg:hidden w-193.5 h-166 -left-60.5 -top-76 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />

        <div className="max-w-7xl w-full mx-auto px-4 flex justify-between items-center gap-4 md:gap-8 z-10">
          <button onClick={() => router.push("/")} className="shrink-0">
            <Image
              src={logoSrc}
              alt="Epinpay"
              width={160}
              height={40}
              className="h-6 md:h-10 w-auto object-contain cursor-pointer"
              priority
            />
          </button>

          <div className="hidden md:block max-w-lg flex-1">
            <SearchInput />
          </div>

          <div className="flex items-center justify-end md:gap-4">
            <IconShape
              icon={Search}
              color="custom"
              customColor="var(--text-heading)"
              variant="square"
              size="lg"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden"
            />

            <div className="hidden lg:flex items-center gap-4">
              <LocaleDropdown />
            </div>

            <div className="flex items-center lg:gap-4">
              <ThemeToggle />
              <CartButton />
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <AuthDropdown />
                
                <Button
                  variant="brand"
                  text="Satıcı ol"
                  padding="sm"
                  className="hidden xs:block"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1 md:gap-3">
                <div className="hidden md:block">
                  <NotificationDropdown />
                </div>
                <div className="relative">
                  <UserDropdown user={user} />
                </div>
              </div>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute inset-0 z-50 bg-white dark:bg-(--bg-neutral-primary-soft) flex items-center px-4 md:hidden animate-in fade-in slide-in-from-top-2">
            <div className="flex-1">
              <SearchInput />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 p-2 text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </header>
    </>
  );
}