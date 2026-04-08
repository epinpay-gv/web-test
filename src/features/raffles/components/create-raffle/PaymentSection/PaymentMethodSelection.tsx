"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PaymentMethodItem } from "@/features/checkout/components/PaymentMethodItem";
import { PaymentSummary } from "@/features/checkout/components/PaymentSummary";
import { usePaymentMethods } from "@/features/checkout/hooks/usePaymentMethods";
import { paymentService, buildRequiredFields } from "@/features/checkout/checkout.service";
import { RaffleFormData } from "../../../raffle.types";
import { RafflePaymentPayload } from "@/features/checkout/types";

interface PaymentMethodSelectionProps {
  data: RaffleFormData;
  discount: number;
  wantsInvoice: boolean;
  onBack: () => void;
}

export function PaymentMethodSelection({ data, discount, wantsInvoice, onBack }: PaymentMethodSelectionProps) {
  const router = useRouter();
  const { methods, isLoading } = usePaymentMethods();
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const [isPaying, setIsPaying] = useState(false);

  const selectedMethod = useMemo(() => 
    methods.find((m) => m.id === selectedMethodId),
    [methods, selectedMethodId]
  );

  const paymentValues = useMemo(() => {
    const productTotal = data.amount - discount;
    const commissionRate = parseFloat((selectedMethod?.commission ?? "0").replace("%", "")) / 100;
    const commission = productTotal * commissionRate;
    
    return {
      commission,
      total: productTotal + commission,
    };
  }, [selectedMethod, data.amount, discount]);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    try {
      setIsPaying(true);
      const extras = buildRequiredFields(selectedMethod);
      
      const payload: RafflePaymentPayload = {
        context: "raffle",
        paymentMethodId: selectedMethodId,
        raffleData: data,
        ...extras,
      };

      const { paylink } = await paymentService.initiatePayment(payload);
      if (paylink) router.push(paylink);
    } catch (error) {
      console.error("Ödeme hatası:", error);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <h2 className="text-xl font-semibold text-(--text-heading)">Ödeme Yöntemi Seçin</h2>
        <div className="flex flex-col gap-3">
          {methods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              isSelected={selectedMethodId === method.id}
              onSelect={setSelectedMethodId}
            />
          ))}
        </div>
        <button onClick={onBack} className="text-sm underline text-(--text-body)">
          Geri dön
        </button>
      </div>

      <div className="lg:col-span-2">
        <PaymentSummary
          productCount={data.prizeCount}
          productTotalAmount={data.amount - discount}
          comission={paymentValues.commission}
          taxes={0}
          totalAmount={paymentValues.total}
          onPay={handlePayment}
          isPaying={isPaying || !selectedMethodId}
        />
      </div>
    </div>
  );
}