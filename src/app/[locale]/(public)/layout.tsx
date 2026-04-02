import { Footer, Header, NavMenuWrapper } from "@/components/layout";
import "@/styles/global.css";
import { TopupModalContainer } from "@/features/catalog/components/TopupModalContainer";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <div className="flex min-h-screen flex-col ">
        <Header />
        <NavMenuWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <TopupModalContainer />
    </>
  );
}