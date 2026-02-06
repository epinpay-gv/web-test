// PremiumSection.tsx
import Section from "@/components/layout/Section/Section";
import TabPlans from "@/components/common/Tabs/TabPlans";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";

const PREMIUM_TABS = [
    {
        id: "1m",
        title: "1 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."
    },
    {
        id: "3m",
        title: "3 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."
    },
    {
        id: "12m",
        title: "12 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."
    }
];

const PREMIUM_FEATURES = [
    "Alışverişlerden Epinpay Puan kazanın (harcadıkça geri kazanç)",
    "Referans alışverişlerinden bakiye kazanın",
    "Öncelikli destek: Taleplerinize hızlı dönüş",
    "Premium üye rozeti hesabınızda görünür",
    "Yeni ürün ve kampanyalara erken erişim",
    "Özel çekiliş ve bonus kampanyalarında daha yüksek şans",
];

const BRAND_NAME = "Epinpay";
const PLAN_NAME = "Premium";

export default function PremiumSection() {
    const [selectedPlan, setSelectedPlan] = useState("1m");

    return (
        <Section backgroundClassName="py-8 bg-[linear-gradient(263.8deg,#F9D697_0.55%,#FFE7DD_24.87%,#BFC3D2_89.38%,#FFDBAD_97.8%)]">
            <div className="">
                <TabPlans
                    plans={PREMIUM_TABS}
                    selectedPlanId={selectedPlan}
                    onPlanSelect={setSelectedPlan}
                />
            </div>

            <div className="bg-(--bg-dark) rounded-b-lg overflow-hidden grid grid-cols-2">
                {/* LEFT */}
                <div className="p-12  flex flex-col gap-6">
                    <div className="flex gap-3">
                        <span className="text-lg text-(--text-white) text-[18px]">{BRAND_NAME}</span>
                        <h2 className="text-[36px] bg-[linear-gradient(270deg,#8C83FF_0%,#A6FFF7_50%,#A86DFF_75%,#FFEE86_100%)] bg-clip-text text-transparent font-bold">
                            {PLAN_NAME}
                        </h2>
                        <Button
                            variant="brand"
                            text="Satın Al"
                            padding="xs"
                            className="font-semibold"
                        />
                    </div>

                    <ul className=" w-132 h-41.5 list-disc list-inside flex flex-col gap-3">
                        {PREMIUM_FEATURES.map((feature, index) => (
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
                        alt={PLAN_NAME}
                        width={8000}
                        height={8000}
                        priority
                        className="absolute object-contain top-12 left-38"
                    />
                </div>
            </div>
        </Section>
    );
}