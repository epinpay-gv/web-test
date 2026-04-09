"use client";
import { useState } from "react";
import { RaffleStepper } from "./RaffleStepper";
import { InfoSection } from "./InfoSection/InfoSection";
import { PrizeSection } from "./PrizeSection/PrizeSection";
import { PaymentSection } from "./PaymentSection/PaymentSection";
import { GiveawayPreview } from "./GiveawayPreview";
import { RaffleFormData, RaffleStep } from "../../raffle.types";

interface CreateRaffleProps {
  data?: RaffleFormData;
  editMode?: boolean
}
export default function CreateRaffle({ data, editMode }: CreateRaffleProps) {
  const initialFormData: RaffleFormData = {
    title: "",
    description: "",
    type: "free",
    prizeCount: 1,
    backupCount: 0,
    endDate: "",
    startDate: "",
    prizes: [],
    amount: 0,
    winnerCount: 0,
    reserveCount: 0
  };
  const [currentStep, setCurrentStep] = useState<RaffleStep>("info");
  const [formData, setFormData] = useState<RaffleFormData>(data ?? initialFormData);

  const updateForm = (newData: Partial<RaffleFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
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
              onNext={() => setCurrentStep("prize")}
            />
          )}
          {currentStep === "prize" && (
            <PrizeSection
              editMode={editMode}
              data={formData}
              onUpdate={updateForm}
              onNext={() => setCurrentStep("payment")}
              onPrev={() => setCurrentStep("info")}
            />
          )}
          {currentStep === "payment" && (
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
