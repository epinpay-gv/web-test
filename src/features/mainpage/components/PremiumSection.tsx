import Section from "@/components/layout/Section/Section";
import TabPlans from "@/features/premium/components/TabPlans";

export default function PremiumSection() {
    return(
        <Section backgroundClassName=" bg-[linear-gradient(263.8deg,#F9D697_0.55%,#FFE7DD_24.87%,#BFC3D2_89.38%,#FFDBAD_97.8%)]">
        <div>
            Premium
            <TabPlans/>
        </div>
        </Section>
    )
}