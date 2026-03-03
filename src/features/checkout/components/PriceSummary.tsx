"use client";

interface PriceSummaryProps {
  totalPrice: number;
  finalPrice: number;
  discount: number | null;
  className?: string;
}

export function PriceSummary({
  totalPrice,
  finalPrice,
  discount,
  className = "",
}: PriceSummaryProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {discount && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-top-2">
          <div className="flex text-(--text-body) justify-between items-center border-b border-(--border-default) pb-2">
            <span className="text-sm">Ürünler</span>
            <span className="font-medium">₺{totalPrice}</span>
          </div>
          <div className="flex text-(--text-body) justify-between items-center border-b border-(--border-default) pb-2">
            <span className="text-sm">İndirim</span>
            <span className="font-medium">-₺{discount}</span>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <span className="text-(--text-heading) font-semibold text-lg">Toplam</span>
        <span className="text-(--text-heading) font-bold text-xl">₺{finalPrice}</span>
      </div>
    </div>
  );
}