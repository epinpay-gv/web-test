"use client";
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
  Cart,
  User as UserIcon,
  QuestionCircle,
  Plus,
  InfoCircle,
} from "flowbite-react-icons/outline";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "@/components/common";

const MENU_ITEMS = [
  { id: "account", label: "Hesap Bilgilerim", icon: UserIcon, href: "/user" },
  { id: "orders", label: "Siparişlerim", icon: Cart, href: "/user/orders" },
  { id: "help", label: "Yardım Merkezi", icon: QuestionCircle, href: "/help" },
];

interface UserDropdownProps {
  user: UserProfile | null | undefined;
}

// TODO : currency datasını storedan alacak
export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const { handleLogout } = useLogout(); 

  if (!user) {
    return (
      <div className="w-8 h-8 rounded-full bg-(--bg-neutral-secondary-medium) animate-pulse" />
    );
  }

  const getInitials = () => {
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
            z-999 
            w-[calc(100vw-32px)] 
            md:w-78.25
            bg-(--bg-neutral-primary-medium)
            border border-(--border-default-medium)
            shadow-2xl
            rounded-(--radius-base)
            overflow-hidden
            animate-in fade-in zoom-in-95
          "
        >
          {/* USER INFO */}
          <DropdownMenuLabel className="p-0">
            <div className="rounded-lg border border-(--border-default-medium) text-sm space-y-2 p-3 font-medium text-(--text-body) w-full bg-(--bg-neutral-secondary-soft) bg-[url(/image/header/user-dropdown-pattern.png)] bg-cover">
              {/* USER INFO AND PREMIUM BUTTON */}
              <div className="leading-6 flex items-center justify-between">
                <div className="flex text-(--text-heading) gap-1 truncate">
                  <span>{user?.name}</span>
                  <span>{user?.surname}</span>
                  {!(user.name || user.surname) && <span>{user.email}</span>}
                </div>
                <div className="mt-2">
                  {/* <button onClick={() => router.push('/premium')} className="cursor-pointer bg-(--bg-neutral-primary-soft) py-0.5 px-3 rounded-(--radius-base) border border-(--border-default) text-(--text-fg-yellow) font-medium flex items-center gap-1 text-[11px] hover:bg-(--bg-neutral-primary-medium) transition-colors">
                    <Star size={14} /> Premium ol
                  </button> */}
                </div>
              </div>

              {/* BALANCE INFO */}
              <div className="space-y-2 w-full h-full gap-1">
                {/* Balance */}
                <div className="bg-(--bg-brand-softer) flex items-center justify-between rounded-(--radius-base) border border-(--border-default-medium) p-2">
                  <div className="leading-[150%] space-y-1">
                    <div className="text-(--text-body) text-xs font-medium">
                      Bakiye
                    </div>
                    <div className="text-white text-sm font-bold">
                      ${user?.balance ?? 0}
                    </div>
                  </div>
                  <Button
                    text="Bakiye yükle"
                    variant="white"
                    padding="xs"
                    className="rounded-full max-w-36 text-sm font-medium gap-1 py-1!"
                    iconLeft={<Plus size={14}/>}
                    onClick={() => router.push('/balance')}
                  />
                </div>

                {/* EP Point */}
                {/* <div className="bg-(--bg-neutral-primary-strong) flex items-center justify-between rounded-(--radius-base) border border-(--border-default-medium) p-2">
                  <div className="leading-[150%] space-y-1">
                    <div className="text-(--text-body) text-xs font-medium">
                      EP Puan
                    </div>
                    <div className="text-white text-sm font-bold">
                      ${user?.epPoints ?? 0}
                    </div>
                  </div>
                  <Button
                    text="Nasıl kullanılır?"
                    variant="secondary"
                    padding="xs"
                    className="rounded-full max-w-36 text-sm font-medium gap-1 py-1!"
                    iconLeft={<InfoCircle size={14}/>}
                  />
                </div> */}
              </div>
            </div>
          </DropdownMenuLabel>

          {/* MENU LINKS */}
          <div className="p-1">
            {MENU_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => router.push(item.href)}
                className="cursor-pointer gap-1.5 p-2 text-(--text-body) rounded-md focus:bg-(--bg-neutral-tertiary-medium) outline-none transition-colors"
              >
                <item.icon size={16} className="shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="my-1 bg-(--border-default-medium) h-px" />

            {/* LOGOUT BUTTON */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-3 p-3 text-(--text-fg-danger) rounded-md focus:bg-red-500/10 outline-none transition-colors"
            >
              <ArrowRightToBracket className="w-4.5 h-4.5 shrink-0" />
              <span className="text-sm font-semibold">Çıkış Yap</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
