"use client";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import "@/styles/global.css";
import {
  userMenu,
  userMenuSecondary,
} from "@/features/user/data/userMenu.data";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { useUserMe } from "@/features/user/hooks/useUserMe";
interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const { data, isLoading } = useUserMe();  
  return (
      <div className="mx-auto flex max-w-322 gap-6 py-8 md:px-4">
        {/* SOL PANEL */}
        <Sidebar
          data={userMenu}
          userData={{
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
            referralCode: data?.referralCode || "",
            isEmailVerified: data?.isIdentityVerified || false,
          }}
          secondaryData={userMenuSecondary}
        />

        {/* SAĞ İÇERİK */}
        <main className="w-full md:rounded-2xl bg-(--bg-neutral-primary-soft) p-6 md:w-239">
          <PageAnimate>{children}</PageAnimate>
        </main>
      </div>
  );
}
