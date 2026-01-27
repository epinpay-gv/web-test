
"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import MasterMenu from "@/features/main/components/MasterMenu";
import BestSellers from "@/features/main/components/BestSellers";
import Campaigns from "@/features/main/components/Campaings";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <MasterMenu />
      <BestSellers /> 
       <Campaigns /> 
    </div>
  );
}
