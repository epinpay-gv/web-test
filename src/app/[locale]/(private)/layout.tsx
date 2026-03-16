"use client";
import { Header, Footer } from "@/components/layout";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import "@/styles/global.css";
import {
  userMenu,
  userMenuSecondary,
} from "@/features/user/data/userMenu.data";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  //TODO : userdata endpointten gelmeli
  return (
    <div className="min-h-screen bg-muted/20">
      <Header />

      <div className="mx-auto flex max-w-322 gap-6 py-8 px-4">
        {/* SOL PANEL */}
        <Sidebar
          data={userMenu}
          userData={{
            firstName: "İlsu",
            lastName: "sunal",
            email: "ilsusunal@gmail.com",
            referralCode: "",
            isEmailVerified: false,
          }}
          secondaryData={userMenuSecondary}
        />

        {/* SAĞ İÇERİK */}
        <main className="w-full rounded-2xl bg-(--bg-neutral-primary-soft) p-6 lg:w-239">
          <PageAnimate>{children}</PageAnimate>
        </main>
      </div>
      <Footer />
    </div>
  );
}
