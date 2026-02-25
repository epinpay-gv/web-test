/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { CartStepper } from "./CartStepper";
import { OrderSummary } from "./OrderSummary";
import { Input } from "@/components/common";
import { CartStep } from "../types";
import { ChevronRight } from "flowbite-react-icons/outline";

interface PaymentCartProps {
  totalPrice: number;
  initialWantsInvoice: boolean;
  currentStep: any;
}

export function PaymentCart({ totalPrice, initialWantsInvoice, currentStep }: PaymentCartProps) {
  // Logic: Sayfa içinde kullanıcı fikrini değiştirirse diye yerel state
  const [wantsInvoice, setWantsInvoice] = useState(initialWantsInvoice);

  return (
    <div className="flex flex-col gap-6">
      {/* Stepper logic'i burada PaymentCart'ın tepesinde */}
      <CartStepper currentStep={currentStep} />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        <div className="lg:col-span-8 space-y-6">
          
          {/* RESİMDEKİ ÜST PANEL: Fatura Formu */}
          {wantsInvoice && (
            <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base) animate-in fade-in slide-in-from-top-4">
               <h2 className="text-xl font-bold mb-2">Fatura bilgilerinizi girin</h2>
               <p className="text-sm text-gray-400 mb-6 font-light">Lütfen fatura detaylarını eksiksiz doldurunuz.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Adınızı girin" />
                  <Input placeholder="Soyadınızı girin" />
                  <Input placeholder="Ülke seçin" />
                  <Input placeholder="Şehir seçin" />
               </div>
            </div>
          )}

          {/* RESİMDEKİ ALT PANEL: Ödeme Yöntemleri */}
          <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
             <h2 className="text-xl font-bold mb-6">Bir ödeme yöntemi seçin</h2>
             <div className="flex flex-col gap-3">
                {/* Ödeme yöntemi butonları (Ziraat, Apple Pay vb.) */}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <OrderSummary 
            totalPrice={totalPrice} 
            // Logic: Ödeme sayfasındayken de checkbox'a basınca form anında açılsın
            onNext={(checked) => setWantsInvoice(checked)} 
          />
        </div>
      </div>
    </div>
  );
}