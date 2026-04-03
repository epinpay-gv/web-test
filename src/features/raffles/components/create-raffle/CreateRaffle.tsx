"use client";
import { useState } from "react";
import { RaffleStepper } from "./RaffleStepper";
import { InfoSection } from "./InfoSection/InfoSection";
import { PrizeSection } from "./PrizeSection/PrizeSection";
import { PaymentSection } from "./PaymentSection/PaymentSection";
import { GiveawayPreview } from "./GiveawayPreview";
import { RaffleFormData, RaffleStep } from "../../raffle.types";

export default function CreateRaffle() {
  const [currentStep, setCurrentStep] = useState<RaffleStep>("info");
  const [formData, setFormData] = useState<RaffleFormData>({
    title: "",
    description: "",
    type: "free",
    prizeCount: 1,
    backupCount: 0,
  });

  const updateForm = (newData: Partial<RaffleFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-[#05080b] text-white">
      <RaffleStepper currentStep={currentStep} />
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 transition-all duration-500">    
        <div className={`${currentStep === "payment" ? "lg:col-span-2 max-w-2xl mx-auto w-full" : ""}`}>
          {currentStep === "info" && (
            <InfoSection 
              data={formData} 
              onUpdate={updateForm} 
              onNext={() => setCurrentStep("prize")} 
            />
          )}
          {currentStep === "prize" && (
            <PrizeSection 
              data={formData} 
              onUpdate={updateForm} 
              onNext={() => setCurrentStep("payment")} 
              onPrev={() => setCurrentStep("info")} 
            />
          )}
          {currentStep === "payment" && (
            <PaymentSection onPrev={() => setCurrentStep("prize")} />
          )}
        </div>
        
        {currentStep !== "payment" && (
          <div className="hidden lg:block sticky top-8 animate-in fade-in zoom-in duration-500">
            <GiveawayPreview data={formData} />
          </div>
        )}
      </main>
    </div>
  );
}