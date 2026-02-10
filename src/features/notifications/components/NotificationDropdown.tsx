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
import { Button } from "@/components/common";

export function NotificationDropdown() {
  const { notifications, markAsRead } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      {/* asChild sayesinde DropdownMenuTrigger kendi butonunu oluşturmaz, 
        içindeki ilk bileşeni (bizim Button'u) tetikleyici olarak kullanır.
      */}
      <DropdownMenuTrigger asChild>
        <div className="relative inline-flex">
          <Button
            variant="ghost"
            padding="xs"
            className="!border-none focus:ring-0"
            icon={<Bell className="w-6 h-6 transition-colors" />}
          />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-(--bg-neutral-secondary-soft) pointer-events-none z-10">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-80 bg-(--bg-neutral-secondary-soft) border-(--border-default-medium) p-1"
      >
        <DropdownMenuLabel className="text-(--text-body) px-2 py-2">
          Bildirimler
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex flex-col items-start gap-1 p-3 cursor-pointer rounded-md focus:bg-(--bg-neutral-tertiary) mb-1 last:mb-0 ${
                  !n.isRead ? "bg-orange-500/5" : ""
                }`}
              >
                <div className="flex justify-between w-full gap-2">
                  <span
                    className={`text-sm font-semibold truncate ${
                      !n.isRead ? "text-orange-500" : "text-(--text-body)"
                    }`}
                  >
                    {n.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">
                    {n.createdAt}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {n.message}
                </p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-neutral-500">
              Bildirim bulunmuyor.
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}