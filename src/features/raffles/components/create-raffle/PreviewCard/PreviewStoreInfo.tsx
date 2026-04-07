// PreviewCard/PreviewStoreInfo.tsx
"use client";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function PreviewStoreInfo() {
  const { user } = useAuthStore();
  
  const getInitials = () => {
    if(!user) return 
    if (user.name || user.surname) {
      const firstInitial = user?.name?.charAt(0).toUpperCase() || "";
      const lastInitial = user?.surname?.charAt(0).toUpperCase() || "";
      return `${firstInitial}${lastInitial}`;
    }
    const emailInitial =
      user.email.charAt(0).toUpperCase() + user.email.charAt(1).toUpperCase();
    return `${emailInitial}`;
  };

  return (
    <div className="flex items-center pt-2 pb-4 px-4 gap-1.5 border-t border-(--border-default) mt-2">
      {/* AVATAR */}
      <button className="flex items-center justify-center gap-2 p-1 rounded-full bg-(--bg-neutral-secondary-medium) transition-colors outline-none group focus:ring-0 hover:bg-(--bg-neutral-secondary-strong)">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-(--text-body) shadow-sm ">
          <span className="text-xs font-bold text-center">{getInitials()}</span>
        </div>
      </button>

      {/* INFO */}
      <div className="flex flex-col text-xs text-white">  
        {user?.displayName} 
      </div>
    </div>
  );
}