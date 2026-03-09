import { Footer, Header, NavMenu } from "@/components/layout";
import PageAnimate from "@/components/common/PageAnimate/PageAnimate";
import "@/styles/global.css";

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
        <NavMenu />
        <PageAnimate>
          <main className="flex-1">{children}</main>
        </PageAnimate>
        <Footer />
      </div>
    </>
  );
}
