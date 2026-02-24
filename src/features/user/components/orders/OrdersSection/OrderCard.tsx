"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";
import { Order } from "@/features/user/user.types";

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/user/orders/${order.id}`);
  };

  const handleInvoiceRequest = (e: React.MouseEvent) => {
    e.stopPropagation();

  };

  const productCount = order.products.length;

  return (
    <div
      onClick={handleNavigate}
      className="bg-(--bg-neutral-primary) border border-[#1D303A] rounded-2xl w-full h-26 cursor-pointer transition hover:border-[#1D303A]/10 flex items-center px-2 mt-2">
      <div className="flex items-center justify-between gap-6 w-full">

        {/* LEFT */}
        <div className="">
          <span className="text-white font-semibold ml-1">
            Sipariş numarası: {order.orderNumber}
          </span>


       <div className="text-xs text-(--text-body) mt-1 flex items-center gap-2">
  <span className="border-r pr-2">{productCount} Ürün</span>

  <span className="flex items-center gap-1 min-w-0">
    <span className="border-r pr-2">Satıcı</span>
    <span
      className="
        underline
        truncate
        max-w-15
        inline-block
        text-(--text-body)
      "
      title={order.sellerName}
    >
      {order.sellerName}
    </span>
  </span>

  <span className="whitespace-nowrap">
    {order.createdAt.toLocaleDateString("tr-TR")}{" "}
    {order.createdAt.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>
</div>
        </div>

        {/* MIDDLE */}

        <div className="flex flex-col gap-3 min-w-50">

          <div className="flex justify-between text-sm">
            <span className="text-(--text-body)">
              Sipariş durumu:
            </span>
            <span className="text-emerald-400 font-medium">
              {order.status === "COMPLETED"
                ? "Tamamlandı"
                : order.status}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-(--text-body)">
              Toplam tutar:
            </span>
            <span className="text-gray-200 font-semibold">
              {order.currency}{order.totalAmount}
            </span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          {order.invoiceStatus === "NONE" && (
            <Button
              text="Fatura talep et"
              variant="dark"
              textSize="sm"
              padding="sm"
              size="full"
              onClick={(e) => {
                e.stopPropagation();
                handleInvoiceRequest(e);
              }}
            />
          )}
 
          <Button
            text="Detay gör"
            variant="dark"
            textSize="sm"
            arrows={{ right: true }}
            padding="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          />
        </div>
      </div>
    </div>
  );
}