"use client";
import { useState, useEffect } from "react";
import { RaffleStepper } from "./RaffleStepper";
import { InfoSection } from "./InfoSection/InfoSection";
import { PrizeSection } from "./PrizeSection/PrizeSection";
import { PaymentSection } from "./PaymentSection/PaymentSection";
import { GiveawayPreview } from "./GiveawayPreview";
import { RaffleFormData, RaffleStep } from "../../raffle.types";
import { updateRaffle } from "@/features/user/user.service";
import { ParticipationConstraint } from "@/types/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CreateRaffleProps {
  data?: RaffleFormData;
  editMode?: boolean
}
export default function CreateRaffle({ data, editMode }: CreateRaffleProps) {
  const router = useRouter();
  const initialFormData: RaffleFormData = {
    title: "",
    description: "",
    type: "free",
    prizeCount: 0,
    backupCount: 0,
    endDate: "",
    startDate: "",
    prizes: [],
    amount: 0,
    winnerCount: 0,
    reserveCount: 0,
    currencyId: 3,
    constraint: ParticipationConstraint.EVERYONE,
  };

  const [currentStep, setCurrentStep] = useState<RaffleStep>("info");
  // data içindeki undefined alanları initialFormData ile dolduruyoruz
  const [formData, setFormData] = useState<RaffleFormData>({ ...initialFormData, ...data });
  const [isUpdating, setIsUpdating] = useState(false);

  // Prop değiştiğinde state'i güncelle (Dolu gelmesini sağlar)
  useEffect(() => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const updateForm = (newData: Partial<RaffleFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      toast.error("Çekiliş ID'si bulunamadı.");
      return;
    }
    try {
      setIsUpdating(true);
      const payload = {
        title: formData.title || "",
        endDate: formData.endDate || ""
      };
      
      await updateRaffle(formData.id, payload);

      toast.success("Çekiliş başarıyla güncellendi.");
      router.push("/user/raffles?type=created");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Güncelleme sırasında bir hata oluştu.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {!editMode &&
        <RaffleStepper currentStep={currentStep} />
      }
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 p-8 transition-all duration-500">
        <div
          className={`${currentStep === "payment" ? "lg:col-span-2 mx-auto w-full " : ""}`}
        >
          {currentStep === "info" && (
            <InfoSection              
              data={formData}
              onUpdate={updateForm}
              onNext={editMode ? handleUpdate : () => setCurrentStep("prize")}
              editMode={editMode}
              isUpdating={isUpdating}
            />
          )}
          {!editMode && currentStep === "prize" && (
            <PrizeSection
              editMode={editMode}
              data={formData}
              onUpdate={updateForm}
              onNext={() => setCurrentStep("payment")}
              onPrev={() => setCurrentStep("info")}
            />
          )}
          {!editMode && currentStep === "payment" && (
            <PaymentSection 
              data={formData} 
              onPrev={() => setCurrentStep("prize")} 
            />
          )}
        </div>

        {currentStep !== "payment" && (
          <div
            className="hidden border rounded-r-(--radius-base) lg:block w-full h-full sticky animate-in fade-in zoom-in duration-500 "
            style={{ background: "var(--bg-raffle-orange-gradient)" }}
          >
            <GiveawayPreview data={formData} />
          </div>
        )}
      </main>
    </div>
  );
}
