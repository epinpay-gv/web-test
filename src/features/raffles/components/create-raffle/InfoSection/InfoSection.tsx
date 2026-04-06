import { RaffleFormData, SectionProps } from "@/features/raffles/raffle.types";
import { ParticipationConstraint } from "@/types/types";
import { RaffleNameSection } from "./RaffleNameSection";
import { RaffleDescriptionSection } from "./RaffleDescriptionSection";
import { ParticipantTypeSection } from "./ParticipantTypeSection";
import { ParticipationTypeSection } from "./ParticipationTypeSection";
import { EndDateSection } from "./EndDateSection";
import { StartDateSection } from "./StartDateSection";
import { ButtonsSection } from "./ButtonsSection";
import { useMemo } from "react";

export function InfoSection({ data, onUpdate, onNext }: SectionProps) {
  const constraintOptions = [
    { value: ParticipationConstraint.EVERYONE, label: "Herkes", disabled: false },
    { value: ParticipationConstraint.REFERENCE, label: "Referanslılara özel", disabled: false },
    { value: ParticipationConstraint.PREMIUM, label: "Premium", disabled: true },
  ];

  const participationTypes: { 
    id: RaffleFormData["type"];
    title: string; 
    description: string; 
  }[] = [
    {
      id: "free",
      title: "Bedelsiz",
      description: 'Kullanıcının ücret ödemeden, "Katıl" butonuna basarak dahil olduğu çekiliş tipidir.',    
    },
    {
      id: "ep",
      title: "EP",
      description: "Kullanıcı, aktivitelerden kazandığı puanla katılır.",
    },
    {
      id: "coupon",
      title: "Kupon",
      description: "Kullanıcı, promosyon kodunu girerek katılır.",
    },
  ];

  const isFormInvalid = useMemo(() => {
    return (
      !data.title || data.title.trim() === "" || 
      !data.constraint ||                         
      !data.endDate                               
    );
  }, [data.title, data.constraint, data.endDate]);
  console.log(data)

  return (
    <div className="space-y-10 p-6 bg-(--bg-neutral-primary-soft) rounded-l-(--radius-base)">
      <div className="border-b border-(--border-default) pb-4 text-(--text-body) font-medium">
        Çekiliş oluşturuluyor
      </div>

      <RaffleNameSection data={data} onUpdate={onUpdate} />
      
      <RaffleDescriptionSection data={data} onUpdate={onUpdate} />

      <ParticipantTypeSection 
        data={data} 
        onUpdate={onUpdate} 
        options={constraintOptions} 
      />

      <ParticipationTypeSection 
        data={data} 
        onUpdate={onUpdate} 
        types={participationTypes} 
      />

      <EndDateSection data={data} onUpdate={onUpdate} />

      <StartDateSection data={data} onUpdate={onUpdate} />

      <ButtonsSection onNext={onNext} disabled={isFormInvalid} />
    </div>
  );
}