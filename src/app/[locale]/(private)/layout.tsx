import { ReactNode } from "react";
import { Header } from "@/components/layout/Header/Header";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import UserSidebar from "@/features/user/components/UserSidebar";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/20">
      <Header variant="private"/>

      <div className="mx-auto flex max-w-5xl gap-4 py-8">
        
        {/* Sol Panel */}
        <aside className="w-77 rounded-xl bg-(--bg-neutral-primary-soft) p-5">
          <UserSidebar />
        </aside>

        {/* Sağ İçerik */}
        <main className="flex-1 rounded-xl bg-(--bg-neutral-primary-soft) p-6">
          <PageAnimate>
            {children}
          </PageAnimate>
        </main>

      </div>
    </div>
  );
}
