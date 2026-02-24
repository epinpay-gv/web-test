import { Header, Footer } from "@/components/layout/Header/Header";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import UserSidebar from "@/features/user/components/UserSidebar";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/20">
      <Header variant="private" />

      <div className="mx-auto flex max-w-322 gap-6 py-8 px-4">
        {/* SOL PANEL */}
        <aside className="hidden w-77 rounded-2xl bg-(--bg-neutral-primary-soft) p-5 lg:block">
          <UserSidebar />
        </aside>

        {/* SAĞ İÇERİK */}
        <main className="w-full rounded-2xl bg-(--bg-neutral-primary-soft) p-6 lg:w-239">
          <PageAnimate>{children}</PageAnimate>
        </main>
        <Footer />
      </div>
    </div>
  );
}
