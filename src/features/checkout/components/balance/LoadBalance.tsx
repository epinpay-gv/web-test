"use client";
import { useState } from "react";
import { LoadBalanceForm } from "./LoadBalanceForm";
import { usePaymentMethods } from "@/features/checkout/hooks/usePaymentMethods";
import { PaymentMethodItem } from "@/features/checkout/components/PaymentMethodItem";
import { PaymentSummary } from "@/features/checkout/components/PaymentSummary";
import { DescriptionTitle } from "@/components/common";
import { ShieldCheck } from "flowbite-react-icons/outline";

export default function LoadBalance() {
  const { methods, isLoading } = usePaymentMethods();
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const [selectedAmountToLoad, setAmountToLoad] = useState<string>("0");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToLoad(e.target.value);
  };

  const handleAmountSelect = (amount: string) => {
    setAmountToLoad(amount);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 ">
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* BALANCE FORM */}
          <div className="flex flex-col gap-6 px-4">
            <DescriptionTitle
              title="Bakiye yükle"
              description="Yüklemek istediğiniz tutarı girerek veya seçerek belirleyiniz."
            />
            <LoadBalanceForm
              onInputChange={handleInputChange}
              onAmountSelect={handleAmountSelect}
              amountToLoad={selectedAmountToLoad}
              currency="$"
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="flex flex-col gap-6 px-4">
            <DescriptionTitle
              title="Bir ödeme yöntemi seçin"
              description="Tüm işlemler güvenli bir şekilde korunur, işlenir ve harici ödeme sağlayıcıları tarafından yetkilendirilir."
              badge={true}
              badgeIcon={
                <ShieldCheck size={12} className="text-(--bg-success-strong)" />
              }
              badgeText="SSL SECURED"
            />
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="text-sm text-gray-500">Yükleniyor...</div>
              ) : (
                methods.map((method) => (
                  <PaymentMethodItem
                    key={method.id}
                    method={method}
                    isSelected={selectedMethodId === method.id}
                    onSelect={setSelectedMethodId}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 mt-20">
          <PaymentSummary
            amountToLoad={selectedAmountToLoad}
            totalAmount={253.33}
          />
        </div>
      </div>
    </div>
  );
}
