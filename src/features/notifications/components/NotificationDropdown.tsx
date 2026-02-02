"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "../stores/notification.store";

export function NotificationDropdown() {
  const { notifications, markAsRead } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-(--text-body) hover:bg-(--bg-neutral-tertiary) rounded-md transition-colors outline-none group">
          <Bell className="w-6 h-6 group-hover:text-orange-500 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-(--bg-neutral-secondary-soft)">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 bg-(--bg-neutral-secondary-soft) border-(--border-default-medium)">
        <DropdownMenuLabel className="text-(--text-body)">Bildirimler</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={`flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-(--bg-neutral-tertiary) ${!n.isRead ? 'bg-orange-500/5' : ''}`}
              >
                <div className="flex justify-between w-full">
                  <span className={`text-sm font-semibold ${!n.isRead ? 'text-orange-500' : 'text-(--text-body)'}`}>{n.title}</span>
                  <span className="text-[10px] text-neutral-500">{n.createdAt}</span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">{n.message}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-neutral-500">Bildirim bulunmuyor.</div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}