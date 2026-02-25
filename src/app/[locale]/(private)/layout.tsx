"use client";
import { Header, Footer } from "@/components/layout";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import "@/styles/global.css";
import { userMenu } from "@/features/user/user-menu";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/20">
      <Header  />

      <div className="mx-auto flex max-w-322 gap-6 py-8 px-4">
        {/* SOL PANEL */}
        <aside className="hidden w-77 rounded-2xl bg-(--bg-neutral-primary-soft) p-5 lg:block">
        <Sidebar data={userMenu}/>
        </aside>

        {/* SAĞ İÇERİK */}
        <main className="w-full rounded-2xl bg-(--bg-neutral-primary-soft) p-6 lg:w-239">
          <PageAnimate>{children}</PageAnimate>
        </main>
      </div>
      <Footer />
    </div>
  );
}
