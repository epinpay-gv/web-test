"use client";
import { Header, Footer } from "@/components/layout";
import "@/styles/global.css";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  //TODO : userdata endpointten gelmeli
  return (
      <div className="flex min-h-screen flex-col ">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
  );
}
