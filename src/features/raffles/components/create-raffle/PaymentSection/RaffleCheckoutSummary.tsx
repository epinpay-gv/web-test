"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/common";
import { PriceSummary } from "@/features/checkout/components/PriceSummary";
import { AgreementSection } from "@/features/checkout/components/AgreementSection";
import { CartErrors } from "@/features/checkout/types";

interface RaffleCheckoutSummaryProps {
  totalPrice: number;
  onConfirm: (discount: number, wantsInvoice: boolean) => void;
}

export function RaffleCheckoutSummary({ totalPrice, onConfirm }: RaffleCheckoutSummaryProps) {
  const agreementRef = useRef<HTMLDivElement>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isAgreed, setIsAgreed] = useState(false);
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [errors, setErrors] = useState<CartErrors>({});

  const finalPrice = totalPrice - discount;

  const handleProcess = () => {
    if (!isAgreed) {
      setErrors({ agreement: true });
      agreementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onConfirm(discount, wantsInvoice);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        <PriceSummary
          totalPrice={totalPrice}
          finalPrice={finalPrice}
          discount={discount > 0 ? discount : null}
        />
        
        <Button
          variant="brand"
          text="Bilgileri Onayla ve Devam Et"
          onClick={handleProcess}
          className="w-full py-4 mb-4"
        />

        <AgreementSection
          isAgreed={isAgreed}
          setIsAgreed={setIsAgreed}
          wantsInvoice={wantsInvoice}
          setWantsInvoice={setWantsInvoice}
          errors={errors}
          setErrors={setErrors}
          agreementRef={agreementRef}
        />
      </div>
      
    </div>
  );
}