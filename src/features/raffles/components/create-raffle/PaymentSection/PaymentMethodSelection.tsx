"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createRaffleApi } from "@/features/raffles/raffles.service";
import { toast } from "react-toastify";
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
  const { methods, isLoading, error } = usePaymentMethods();
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
      const payload = {
        ...data,
        paymentMethodId: selectedMethodId,
      };

      const response = await createRaffleApi(payload);
      
      if (response.success && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else if (response.success) {
        toast.success("Çekiliş başarıyla oluşturuldu!");
        router.push("/raffles/my-raffles");
      }
    } catch (err: any) {
      toast.error(err.message || "Ödeme başlatılamadı.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <h2 className="text-xl font-semibold text-(--text-heading)">Ödeme Yöntemi Seçin</h2>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="py-10 text-center text-(--text-body)">Yükleniyor...</div>
          ) : error ? (
            <div className="py-10 text-center text-(--text-fg-danger)">{error}</div>
          ) : methods.length > 0 ? (
            methods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                method={method}
                isSelected={selectedMethodId === method.id}
                onSelect={setSelectedMethodId}
              />
            ))
          ) : (
            <div className="py-10 text-center text-(--text-body)">
              Ödeme yöntemi bulunamadı. Lütfen daha sonra tekrar deneyiniz.
            </div>
          )}
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