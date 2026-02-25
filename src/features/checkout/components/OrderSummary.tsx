"use client";
import { Button, CheckBox, Input } from "@/components/common";
import { Envelope } from "flowbite-react-icons/outline";
import { DiscountCodeForm } from "./DiscountCodeForm";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";


interface OrderSummaryProps {
  totalPrice: number;
  onNext: () => void;
}

export function OrderSummary({ totalPrice, onNext }: OrderSummaryProps) {
  const [discount, setDiscount] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);  
  const user = useAuthStore((state) => state.user);
  const [errors, setErrors] = useState<{
    email: boolean | undefined;
    agreement: boolean | undefined;
  }>({
    email: undefined,
    agreement: undefined,
  });

  const finalPrice = totalPrice - (discount || 0);

  const handlePayment = () => {
    let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const currentErrors = {
      email: !isEmailValid,
      agreement: !isAgreed,
    };

    setErrors(currentErrors);
    if(user?.email){
      isEmailValid = true
    }
    if (isEmailValid && isAgreed) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        {/* Avantajlar Kutusu */}
        {!user?.email &&      
          <div className="flex flex-col gap-4 border-b border-(--border-default) pb-4 ">
            <p className="text-(--text-heading) text-sm mb-2">
              E-posta adresinizi girin. Siparişinizi göndermek için e-posta
              adresinize ihtiyacımız var.
            </p>
            
            <Input
              placeholder="Email adresinizi girin"
              leftIcon={<Envelope size={16} />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email !== undefined)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={errors.email === true ? true : undefined}
            />
            {errors.email === true && (
              <p className="text-xs leading-5 text-(--text-fg-danger-strong) animate-in fade-in">
                Doldurulması zorunlu alan
              </p>
            )}

            <div className="flex items-start gap-2.5">
              <CheckBox className="w-4 h-4" />
              <p className="text-xs">
                Bu mail ile hesap oluştur. Avantajlardan faydalan
              </p>
            </div>
          </div>
        }
        {/* Ödeme Kutusu (Geri Eklenen Bölüm) */}
        <div className="space-y-4">
          {discount !== null && (
            <div className="animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between items-center mb-4 border-b border-(--border-default) pb-2">
                <span className="text-(--text-body) font-medium">Ürünler</span>
                <span className="text-(--text-body) font-medium">₺{totalPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-4 border-b border-(--border-default) pb-2">
                <span className="text-(--text-body) font-medium">İndirim</span>
                <span className="text-(--text-body) font-medium">₺{discount}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <span className="text-(--text-heading) ">
              Toplam
            </span>

            <span className="text-(--text-heading) ">
              ₺{finalPrice}
            </span>
          </div>

          <Button
            variant="brand"
            text="Ödemeye Devam Et"
            onClick={handlePayment}
            className="w-full"
          />

          {/* Sözleşme Onayı */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <CheckBox
                checked={isAgreed}
                onCheckedChange={(checked: boolean) => {
                  setIsAgreed(checked);
                  if (errors.agreement !== undefined)
                    setErrors((prev) => ({ ...prev, agreement: undefined }));
                }}
                className={cn(
                  "w-4 h-4 mt-1 transition-colors",
                  errors.agreement === true &&
                    "border-(--border-danger-subtle) bg-(--bg-danger-soft)",
                )}
              />
              <p className="text-xs leading-4 text-(--text-heading)">
                Ödemeye Devam Et butonuna tıklayarak{" "}
                <span className="text-(--text-fg-brand) font-medium cursor-pointer">
                  Mesafeli Satış Sözleşmesini
                </span>{" "}
                ve{" "}
                <span className="text-(--text-fg-brand) font-medium cursor-pointer">
                  İade ve İptal Koşullarını
                </span>{" "}
                okuduğumu ve kabul ettiğimi onaylıyorum.
              </p>
            </div>
            {errors.agreement === true && (
              <p className="text-xs leading-5 text-(--text-fg-danger-strong) animate-in fade-in">
                Doldurulması zorunlu alan
              </p>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <CheckBox className="w-4 h-4" />
            <p className="text-xs">Fatura istiyorum</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
        <DiscountCodeForm onApply={(amount) => setDiscount(amount)} />
      </div>
    </div>
  );
}
