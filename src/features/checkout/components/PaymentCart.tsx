"use client";
import { useState, useMemo } from "react";
import { CartStepper } from "./CartStepper";
import { Badge } from "@/components/common";
import { CartStep, CartSummary, InvoiceForm } from "../types";
import { ShieldCheck } from "lucide-react";
import { InvoiceFormSection } from "./InvoiceFormSection";
import { usePaymentMethods } from "../hooks/usePaymentMethods";
import { PaymentMethodItem } from "./PaymentMethodItem";
import { PaymentSummary } from "./PaymentSummary";
import { useRouter } from "next/navigation";
import { paymentService, buildRequiredFields } from "../checkout.service";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface PaymentCartProps {
  totalPrice: number;
  summary: CartSummary | null;
  itemCount: number;
  initialWantsInvoice: boolean;
  currentStep: CartStep;
  guestEmail?: string;
}

export function PaymentCart({
  totalPrice,
  summary,
  itemCount,
  initialWantsInvoice,
  currentStep,
  guestEmail,
}: PaymentCartProps) {
  const { methods, isLoading } = usePaymentMethods();
  const user = useAuthStore((state) => state.user);
  const [wantsInvoice] = useState(initialWantsInvoice);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const selectedMethod = methods.find((m) => m.id === selectedMethodId);

  const paymentValues = useMemo(() => {
    const productTotal = Number(summary?.productTotal ?? totalPrice);
    const commissionRate = parseFloat((selectedMethod?.commission ?? "0").replace("%", "")) / 100;
    const commission = productTotal * commissionRate;
    const taxes = Number(summary?.taxes ?? 0);
    return { commission, taxes, total: productTotal + commission + taxes };
  }, [selectedMethod, summary, totalPrice]);
  const [invoiceForm, setInvoiceForm] = useState<InvoiceForm>({
    name: "",
    surname: "",
    country: "",
    city: "",
  });
  const [isPaying, setIsPaying] = useState(false);

  const router = useRouter();

  const handleInputChange =
    (field: keyof InvoiceForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvoiceForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handlePayment = async () => {
    if (!selectedMethod) return;

    try {
      setIsPaying(true);
      if (!user?.email && guestEmail) {
        localStorage.setItem("guest_checkout", JSON.stringify({ email: guestEmail }));
      }
      const extras = buildRequiredFields(selectedMethod);

      const payload = paymentService.createPaymentPayload({
        context: "checkout",
        paymentMethodId: selectedMethodId,
        ...(!user?.email && guestEmail ? { guestEmail } : {}),
        ...extras,
      });
      const { paylink } = await paymentService.initiatePayment(payload);
      router.push(paylink);
    } catch (error) {
      console.error("Ödeme başlatılamadı:", error);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <CartStepper currentStep={currentStep} />
      {/* Invoice Form */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 ">
        <div className="lg:col-span-3 flex flex-col gap-4">
          {wantsInvoice && (
            <InvoiceFormSection
              formData={invoiceForm}
              onInputChange={handleInputChange}
            />
          )}
          <div className="flex flex-col gap-6 px-4">
            <div className="flex flex-col gap-2 max-h-19 overflow-hidden ">
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold text-(--text-heading) leading-7">
                  Bir ödeme yöntemi seçin
                </h2>
                <Badge
                  icon={
                    <ShieldCheck
                      size={12}
                      className="text-(--bg-success-strong)"
                    />
                  }
                  text="SSL SECURED"
                  theme="success"
                  size="sm"
                  className="py-0.5 px-1 gap-1 font-(--font-base)"
                />
              </div>
              <p className="text-sm font-(--font-base) leading-5 text-(--text-heading)">
                Tüm işlemler güvenli bir şekilde korunur, işlenir ve harici
                ödeme sağlayıcıları tarafından yetkilendirilir.
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
            productCount={itemCount}
            productTotalAmount={summary?.productTotal ?? totalPrice}
            comission={paymentValues.commission}
            taxes={paymentValues.taxes}
            totalAmount={paymentValues.total}
            onPay={handlePayment}
            isPaying={isPaying}
          />
        </div>
      </div>
    </div>
  );
}
