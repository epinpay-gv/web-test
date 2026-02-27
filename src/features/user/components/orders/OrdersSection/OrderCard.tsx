"use client";

import Link from "next/link";
import { Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/features/user/user.types";
import { Button } from "@/components/common";
import { AngleRight } from "flowbite-react-icons/outline";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const statusLabel = ORDER_STATUS_LABELS[order.status];
  const statusColor = ORDER_STATUS_COLORS[order.status];

  const createdAt = new Date(order.createdAt);
  const formattedDate = createdAt.toLocaleDateString("tr-TR");
  const formattedTime = createdAt.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) p-5">

      {/* SOL */}
      <div className="flex flex-col gap-1">
        {/* Sipariş No */}
        <span className="text-[16px] font-semibold text-(--text-white)">
          Sipariş numarası: {order.orderNumber}
        </span>

        {/* Alt Bilgi */}
        <div className="flex items-center gap-2 text-sm text-(--text-body)">
          <span className="border-r pr-1">
            {order.products.length} Ürün
          </span>
          <span className="border-r pr-1 max-w-27.5 truncate">
            Satıcı {order.sellerName}
          </span>
          <span>
            {formattedDate} {formattedTime}
          </span>
        </div>
      </div>

      {/* SAĞ */}

      <div className="flex items-center flex-1">

        {/* ORTA BİLGİ */}
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1  text-sm">

            <span className="text-(--text-body)">
              Sipariş Durumu:
            </span>
            <span className={`font-medium ${statusColor}`}>
              {statusLabel}
            </span>

            <span className="text-(--text-body)">
              Toplam tutar:
            </span>
            <span className="font-semibold">
              {order.currency}
              {order.totalAmount}
            </span>

          </div>
        </div>

        {/* BUTONLAR */}
        <div className="flex items-center gap-2 text-(--text-body) whitespace-nowrap">
          {/* {order.invoiceStatus !== "NONE" && (
            <Button
              text="Fatura talep et"
              textSize="sm"
              variant="dark"
            />
          )} */}

          <Link href={`/user/orders/${order.id}`}>
            <Button
              text="Detay gör"
              textSize="sm"
              variant="dark"
              icon={<AngleRight className="w-4 h-4" />}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};