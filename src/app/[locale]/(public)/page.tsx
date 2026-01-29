"use client";

import { useTranslations } from "next-intl";
import MasterMenu from "@/features/main/components/MasterMenu";
import BestSellers from "@/features/main/components/BestSellers";
import Campaigns from "@/features/main/components/Campaings";
import NavLinkCards from "@/components/common/NavLinks/NavLinkCards";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-4">
        <NavLinkCards/>
        <MasterMenu />
        <BestSellers />
        <Campaigns />
      </div>
    </div>
  );
}
