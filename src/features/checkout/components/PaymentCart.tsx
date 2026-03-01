/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { CartStepper } from "./CartStepper";
import { Badge } from "@/components/common";
import { CartStep, InvoiceForm  } from "../types";
import { ShieldCheck } from "lucide-react";
import { InvoiceFormSection } from "./InvoiceFormSection";
import { usePaymentMethods } from "../hooks/usePaymentMethods";
import { PaymentMethodItem } from "./PaymentMethodItem";
import { PaymentSummary } from "./PaymentSummary";

interface PaymentCartProps {
  totalPrice: number;
  initialWantsInvoice: boolean;
  currentStep: CartStep;
}

export function PaymentCart({ totalPrice, initialWantsInvoice, currentStep }: PaymentCartProps) {
  const { methods, isLoading } = usePaymentMethods();  
  const [wantsInvoice, setWantsInvoice] = useState(initialWantsInvoice);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const [invoiceForm, setInvoiceForm ] = useState<InvoiceForm>({
    name: "",
    surname: "",
    country: "",
    city: ""
  });

  const handleInputChange = (field: keyof InvoiceForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  return (
    <div className="flex flex-col gap-6">      
      <CartStepper currentStep={currentStep} />
      {/* Invoice Form */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 px-4">
        <div className="lg:col-span-3 flex flex-col gap-4">                    
         {wantsInvoice && (
            <InvoiceFormSection 
              formData={invoiceForm} 
              onInputChange={handleInputChange} 
            />
          )}

          {/* RESİMDEKİ ALT PANEL: Ödeme Yöntemleri */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 max-h-19 overflow-hidden ">
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold text-(--text-heading) leading-7">Bir ödeme yöntemi seçin</h2>
                <Badge 
                  icon={<ShieldCheck size={12} className="text-(--bg-success-strong)"/>} 
                  text="SSL SECURED" 
                  theme="success" 
                  size="sm"
                  className="py-0.5 px-1 gap-1 font-(--font-base)"
                />
              </div>
              <p className="text-sm font-(--font-base) leading-5 text-(--text-heading)">
                Tüm işlemler güvenli bir şekilde korunur, işlenir ve harici ödeme sağlayıcıları tarafından yetkilendirilir.
              </p>
            </div>
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

        <div className="lg:col-span-2 mt-25">
          <PaymentSummary 
            productCount={2} 
            comission={9.47} 
            productTotalAmount={269.00} 
            taxes={1.06} 
            totalAmount={253.33}
           />
        </div>
      </div>
    </div>
  );
}