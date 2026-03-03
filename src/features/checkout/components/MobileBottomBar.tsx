"use client";
import { Button } from "@/components/common";
import { cn } from "@/lib/utils";

interface MobileBottomBarProps {
  totalPrice: number;
  finalPrice: number;
  discount: number | null;
  onPayment: () => void;
  onScrollToDiscount: () => void;
}

export function MobileBottomBar({
  totalPrice,
  finalPrice,
  discount,
  onPayment,
  onScrollToDiscount,
}: MobileBottomBarProps) {
  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 w-full",
        "bg-[#0B1A24] border-t border-(--border-default)",
        "p-4 px-6",
        "z-20",
        !discount ? "flex items-center justify-between" : ""
      )}
    >
      {!discount ? (
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            Toplam
          </span>
          <span className="text-lg font-bold text-white leading-tight">
            ₺{finalPrice}
          </span>
        </div>
      ) : (
        <div>
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
          <div className="flex justify-between items-center mb-6">
            <span className="text-(--text-heading) font-semibold text-lg">Toplam</span>
            <span className="text-(--text-heading) font-bold text-xl">₺{finalPrice}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {!discount && (
          <button
            onClick={onScrollToDiscount}
            className="text-(--text-fg-brand) max-w-11.75 text-right text-xs transition-colors"
          >
            İndirim kodu gir
          </button>
        )}
        <Button
          variant="brand"
          text="Ödemeye Devam Et"
          onClick={onPayment}
          className="max-w-fit h-auto text-sm font-bold rounded-xl active:scale-95"
        />
      </div>
    </div>
  );
}