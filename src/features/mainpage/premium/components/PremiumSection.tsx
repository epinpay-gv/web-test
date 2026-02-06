import Section from "@/components/layout/Section/Section";
import TabPlans from "@/features/mainpage/premium/components/TabPlans";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";

// Backend'den gelecek type tanımlamalrı 
interface PremiumPlan {
    id: string;
    title: string;
    description: string;
    features: string[];
}

const MOCK_PREMIUM_PLANS: PremiumPlan[] = [
    {
        id: "1m",
        title: "1 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır.",
        features: [
            "Alışverişlerden Epinpay Puan kazanın (harcadıkça geri kazanç)",
            "Referans alışverişlerinden bakiye kazanın",
            "Öncelikli destek: Taleplerinize hızlı dönüş",
            "Premium üye rozeti hesabınızda görünür",
            "Yeni ürün ve kampanyalara erken erişim",
            "Özel çekiliş ve bonus kampanyalarında daha yüksek şans",
        ]
    },
    {
        id: "3m",
        title: "3 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır.",
        features: [
            "Alışverişlerden Epinpay Puan kazanın (harcadıkça geri kazanç)",
            "Referans alışverişlerinden bakiye kazanın",
            "Öncelikli destek: Taleplerinize hızlı dönüş",
            "Premium üye rozeti hesabınızda görünür",
            "Yeni ürün ve kampanyalara erken erişim",
        ]
    },
    {
        id: "12m",
        title: "12 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır.",
        features: [
            "Alışverişlerden Epinpay Puan kazanın (harcadıkça geri kazanç)",
            "Referans alışverişlerinden bakiye kazanın",
            "Öncelikli destek: Taleplerinize hızlı dönüş",
            "Premium üye rozeti hesabınızda görünür",
            "Yeni ürün ve kampanyalara erken erişim",
            "Özel çekiliş ve bonus kampanyalarında daha yüksek şans",
        ]
    }
];

const BRAND_NAME = "Epinpay";
const PLAN_NAME = "Premium";

interface PremiumSectionProps {
    plans?: PremiumPlan[]; 
}

export default function PremiumSection({ plans = MOCK_PREMIUM_PLANS }: PremiumSectionProps) {
    const [selectedPlan, setSelectedPlan] = useState(plans[0]?.id || "1m");
    const currentPlan = plans.find(plan => plan.id === selectedPlan);

    return (
        <Section backgroundClassName="hidden md:block py-8 bg-[linear-gradient(263.8deg,#F9D697_0.55%,#FFE7DD_24.87%,#BFC3D2_89.38%,#FFDBAD_97.8%)]">
            <div className="">
                <TabPlans
                    plans={plans}
                    selectedPlanId={selectedPlan}
                    onPlanSelect={setSelectedPlan}
                />
            </div>

            <div className="bg-(--bg-dark) rounded-b-lg overflow-hidden grid grid-cols-2">
                {/* LEFT */}
                <div className="p-8 mb-12 flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[18px] text-(--text-white)">
                                {BRAND_NAME}
                            </span>
                            <h2 className="text-[36px] bg-[linear-gradient(270deg,#8C83FF_0%,#A6FFF7_50%,#A86DFF_75%,#FFEE86_100%)] bg-clip-text text-transparent font-bold">
                                {PLAN_NAME}
                            </h2>
                        </div>
                        <Button
                            variant="brand"
                            text="Satın Al"
                            padding="xs"
                            className="font-semibold w-21 h-10 rounded-[12px]"
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
                        alt={PLAN_NAME}
                        width={3000}
                        height={600}
                        priority
                        className="absolute object-cover top-40 left-22 transform scale-250"
                    />
                </div>
            </div>
        </Section>
    );
}