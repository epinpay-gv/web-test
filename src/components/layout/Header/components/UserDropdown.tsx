"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { UserProfile } from "@/features/auth/auth.types";
import { 
  Star, 
  ArrowRightToBracket, 
  AdjustmentsHorizontal, 
  Lock, 
  User as UserIcon, 
  Bell, 
  QuestionCircle 
} from "flowbite-react-icons/outline";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { id: "account", label: "Hesap Bilgilerim", icon: UserIcon, href: "/profile" },
  { id: "settings", label: "Ayarlar", icon: AdjustmentsHorizontal, href: "/settings" },
  { id: "privacy", label: "Gizlilik", icon: Lock, href: "/privacy" },
  { id: "notifications", label: "Bildirimlerim", icon: Bell, href: "/notifications" },
  { id: "help", label: "Yardım Merkezi", icon: QuestionCircle, href: "/help" },
];

interface UserDropdownProps {
  user: UserProfile | null | undefined; // user undefined gelebilir
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const router = useRouter();

  // Kullanıcı henüz yüklenmemişse iskelet veya boş bir tetikleyici dönerek hatayı engelle
  if (!user) {
    return (
      <div className="w-8 h-8 rounded-full bg-(--bg-neutral-secondary-medium) animate-pulse" />
    );
  }

  const getInitials = () => {
    // Optional chaining (?) ve fallback values kullanarak undefined hatasını kökten çözeriz
    const firstInitial = user?.name?.charAt(0).toUpperCase() || "";
    const lastInitial = user?.surname?.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}` || "??";
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-full bg-(--bg-neutral-secondary-medium) transition-colors outline-none group focus:ring-0 hover:bg-(--bg-neutral-secondary-strong)">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-(--text-body) shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xs font-bold">{getInitials()}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="
            z-[999] 
            w-[calc(100vw-32px)] 
            md:w-[313px]
            bg-(--bg-neutral-primary-medium)
            border border-(--border-default-medium)
            shadow-2xl
            rounded-(--radius-base)
            overflow-hidden
            animate-in fade-in zoom-in-95
          "
        >
          <DropdownMenuLabel className="p-0">
            <div className="text-sm gap-1 grid grid-cols-2 p-4 font-medium text-(--text-body) w-full bg-(--bg-neutral-secondary-soft) bg-[url(/image/header/user-dropdown-pattern.png)] bg-cover truncate">
              <div className="leading-6 flex flex-col justify-center">
                <div className="flex text-(--text-heading) gap-1 font-bold truncate">
                  <span>{user?.name}</span>
                  <span>{user?.surname}</span>
                </div>
                <div className="mt-2">
                  <button className="bg-(--bg-neutral-primary-soft) py-0.5 px-3 rounded-(--radius-base) border border-(--border-default) text-(--text-fg-yellow) font-medium flex items-center gap-1 text-[11px] hover:bg-(--bg-neutral-primary-medium) transition-colors"> 
                    <Star size={11}/> Premium
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 w-full h-full gap-1">
                <div className="bg-linear-to-b from-[rgba(34,199,228,1)] to-[rgba(7,138,142,1)] flex flex-col items-center justify-center rounded-(--radius-base) border border-white/10 py-2" >
                  <span className="text-white font-bold text-sm tracking-tight">${user?.balance ?? 0}</span>
                  <span className="text-white/80 text-[10px] font-normal">Bakiye</span>
                </div>
                <div className="bg-linear-to-b from-[rgba(228,190,34,1)] to-[rgba(142,115,7,1)] flex flex-col items-center justify-center rounded-(--radius-base) border border-white/10 py-2" >
                  <span className="text-white font-bold text-sm tracking-tight">{user?.epPoints ?? 0}</span>
                  <span className="text-white/80 text-[10px] font-normal">EP Puan</span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-(--border-default-medium) h-[1px]" />

          <div className="p-1">
            {MENU_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => router.push(item.href)}
                className="cursor-pointer gap-3 p-3 text-(--text-body) rounded-md focus:bg-(--bg-neutral-tertiary) outline-none transition-colors"
              >
                <item.icon className="w-4.5 h-4.5 opacity-70 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="my-1 bg-(--border-default-medium) h-[1px]" />

            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer gap-3 p-3 text-(--text-fg-danger) rounded-md focus:bg-red-500/10 outline-none transition-colors"
            >
              <ArrowRightToBracket className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="text-sm font-semibold">Çıkış Yap</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}