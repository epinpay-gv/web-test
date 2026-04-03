"use client";
import { Button } from "@/components/common";

interface PaymentSummaryProps {
  amountToLoad?: string;
  productCount?: number;
  productTotalAmount?: number;
  comission?: number;
  taxes?: number;
  totalAmount: number;
  onPay: () => void;
  isPaying?: boolean;
}

export function PaymentSummary({
  amountToLoad,
  productCount,
  productTotalAmount,
  comission,
  taxes,
  totalAmount,
  onPay,
  isPaying,
}: PaymentSummaryProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-(--bg-neutral-primary-soft) text-(--text-body) font-base leading-6 p-6 border border-[#1D303A] rounded-(--radius-base)">
      {/* Üst Bilgiler */}
      {amountToLoad && (
        <div className="pb-2 flex justify-between border-b border-[#1D303A]">
          <p>Yüklenecek tutar</p>
          <p>₺{formatPrice(Number(amountToLoad))}</p>
        </div>
      )}
      {productCount && productTotalAmount && (
        <div className="pb-2 flex justify-between border-b border-[#1D303A]">
          <p>
            {productCount > 1 ? `${productCount} ürün toplamı` : "Ürün fiyatı"}
          </p>
          <p>₺{formatPrice(productTotalAmount)}</p>
        </div>
      )}
      {comission && (
        <div className="py-2 flex justify-between border-b border-[#1D303A]">
          <p>Komisyon</p>
          <p>₺{formatPrice(comission)}</p>
        </div>
      )}
      {taxes && (
        <div className="py-2 flex justify-between border-b border-[#1D303A]">
          <p>Vergiler</p>
          <p>₺{formatPrice(taxes)}</p>
        </div>
      )}
      <div className="py-2 flex justify-between text-(--text-heading) font-semibold">
        <p>Toplam</p>
        <p>₺{formatPrice(totalAmount)}</p>
      </div>

      <div className="mt-4 hidden lg:block">
        <Button
          variant="brand"
          text="Ödemeye Devam Et"
          className="w-full"
          onClick={onPay}
          disabled={isPaying}
        />
      </div>

      <div className="lg:hidden fixed flex justify-between bottom-0 left-0 w-full bg-(--bg-neutral-primary-soft) border-t border-[#1D303A] px-6 pt-6 pb-8 z-100 ">
        <div className="flex flex-col items-start mb-2 text-(--text-heading)">
          <span className="text-sm">Toplam </span>
          <span className="text-lg font-bold">₺{formatPrice(totalAmount)}</span>
        </div>
        <Button
          variant="brand"
          text="Ödemeye Devam Et"
          className="max-w-fit"
          onClick={onPay}
          disabled={isPaying}
        />
      </div>
    </div>
  );
}
