"use client";

import Link from "next/link"
import { SidebarItemData } from "../sidebar.types";
import {usePathname} from "next/navigation";

interface SidebarItemProps{
    data: SidebarItemData;
}
export const SidebarItem = ({data} : SidebarItemProps) => {
const pathname = usePathname();
const isActive = pathname === data.url || pathname.endsWith(data.url);

const Icon = data.icon;

  return (
   <Link
      href={data.url}
      className={`flex items-center gap-3 rounded-md px-4 py-2 text-[16px] transition ${
        isActive
          ? "text-(--text-fg-brand) bg-(--bg-neutral-secondary-medium)"
          : "text-(--text-body)"
      }`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {data.label}
    </Link>
  )
}