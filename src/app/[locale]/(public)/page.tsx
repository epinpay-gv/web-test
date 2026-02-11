"use client";
import MasterMenu from "@/features/mainpage/components/MasterMenu";
import BestSellers from "@/features/mainpage/bestsellers/components/BestSellers";
// import Campaigns from "@/features/mainpage/components/Campaings";
import PremiumSection from "@/features/mainpage/premium/components/PremiumSection";

export default function Home() {
  return (
    <>
      <MasterMenu />
      <BestSellers />
      {/* <Campaigns /> */}
      <PremiumSection />
    </>
  );
}
