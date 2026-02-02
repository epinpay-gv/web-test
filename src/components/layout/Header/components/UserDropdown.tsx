"use client";

import * as React from "react";
import {
  User as UserIcon,
  LogOut,
  Settings,
  Package,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/features/auth/auth.types"; // Daha önce oluşturduğumuz tip

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  // İsmin baş harfini güvenli bir şekilde alalım
  const getInitials = () => {
    const firstInitial = user.name?.charAt(0).toUpperCase() || "";
    const lastInitial = user.surname?.charAt(0).toUpperCase() || "";
    
    const combined = `${firstInitial}${lastInitial}`;
    
    // Eğer isim ve soyisim boşsa "?" döndür
    return combined || "?";
  };

  const initial = getInitials();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-full border border-(--border-default-medium) hover:bg-(--bg-neutral-tertiary) transition-colors outline-none group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xs font-bold">{initial}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-56 bg-(--bg-neutral-secondary-soft) border-(--border-default-medium)"
      >
        <DropdownMenuLabel className="flex flex-col">
          <div className="text-sm flex gap-1 font-medium text-(--text-body) truncate">
            <span>{user.name}</span>
            <span>{user.surname}</span>
          </div>
          <span className="text-xs text-neutral-500 font-normal truncate">
            {user.email}
          </span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer gap-2 text-(--text-body) focus:bg-(--bg-neutral-tertiary)">
          <Package className="w-4 h-4 opacity-70" /> 
          <span>Siparişlerim</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-2 text-(--text-body) focus:bg-(--bg-neutral-tertiary)">
          <CreditCard className="w-4 h-4 opacity-70" /> 
          <span>Cüzdanım</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer gap-2 text-(--text-body) focus:bg-(--bg-neutral-tertiary)">
          <Settings className="w-4 h-4 opacity-70" /> 
          <span>Ayarlar</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={onLogout}
          className="cursor-pointer gap-2 text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
        >
          <LogOut className="w-4 h-4" /> 
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}