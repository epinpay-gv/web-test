"use client";
import TabPlans from "@/features/mainpage/components/premium/TabPlans";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import { PremiumPlan } from "../../mainpage.types";

interface PremiumSectionProps {
  data: PremiumPlan[];
}

export default function PremiumSection({ data }: PremiumSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState(data[0]?.id || "1m");
  const currentPlan = data.find((plan) => plan.id === selectedPlan);

  return (
    <div className="hidden md:block py-8 bg-[linear-gradient(263.8deg,#F9D697_0.55%,#FFE7DD_24.87%,#BFC3D2_89.38%,#FFDBAD_97.8%)]">
      <div className="max-w-5xl mx-auto">
        {/* TABS */}
        <TabPlans
          plans={data}
          selectedPlanId={selectedPlan}
          onPlanSelect={setSelectedPlan}
        />

        {/* DESCRIPTION & ACTION BUTTON */}
        <div className="bg-(--bg-dark) rounded-b-lg overflow-hidden grid grid-cols-2">
          {/* LEFT */}
          <div className="p-8 mb-12 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="flex flex-col leading-tight">
                <span className="text-[18px] text-(--text-white)">
                  Epinpay
                </span>
                <h2 className="text-[36px] bg-[linear-gradient(270deg,#8C83FF_0%,#A6FFF7_50%,#A86DFF_75%,#FFEE86_100%)] bg-clip-text text-transparent font-bold">
                  Premium
                </h2>
              </div>
              <Button
                variant="brand"
                text="Satın Al"
                padding="xs"
                className="font-semibold w-21 h-10 rounded-2xl"
              />
            </div>

            <ul className="pl-2 w-132 h-41.5 list-disc list-inside flex flex-col gap-3">
              {currentPlan?.features.map((feature, index) => (
                <li key={index} className="text-(--text-white)">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <Image
              src="/image/premium/premium.png"
              alt="Epinpay Premium"
              width={3000}
              height={600}
              priority
              className="absolute object-cover top-40 left-22 transform scale-250"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
