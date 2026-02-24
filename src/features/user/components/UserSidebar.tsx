"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { userMenu } from "../user-menu";


export default function UserSidebar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {userMenu.map((item) => {
                console.log("pathname:", pathname);
                console.log("item.url:", item.url);

                // const isActive = pathname === item.url;
                const isActive = pathname.endsWith(item.url);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.url}
                        href={item.url}
                        className={`flex items-center gap-3 rounded-md px-4 py-2 text-[16px] font-base transition ${isActive
                                ? "text-(--text-fg-brand) bg-(--bg-neutral-secondary-medium)"
                                : "text-(--text-body)"
                            }`}
                    >
                        <Icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
 