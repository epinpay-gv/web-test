import { useMemo } from "react";
import Link from "next/link";
import {
  Order,
  getOrderDisplayStatus,
  ORDER_DISPLAY_LABELS,
  ORDER_DISPLAY_COLORS,
} from "@/features/user/user.types";
import { AngleRight } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const displayStatus = getOrderDisplayStatus(order.status);
  const statusLabel = ORDER_DISPLAY_LABELS[displayStatus];
  const statusColor = ORDER_DISPLAY_COLORS[displayStatus];

  const { formattedDate, formattedTime } = useMemo(() => {
    const date = new Date(order.createdAt);
    return {
      formattedDate: date.toLocaleDateString("tr-TR"),
      formattedTime: date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [order.createdAt]);

  return (
    <div className="relative flex items-center justify-between rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) p-5 hover:opacity-80 transition-opacity cursor-pointer">

      {/* SOL */}
      <div className="flex flex-col gap-1">
        <span className="text-[16px] font-semibold text-(--text-white)">
          Sipariş numarası: {order.orderNumber}
        </span>
        <div className="flex items-center gap-2 text-sm text-(--text-body)">
          <span className="border-r border-(--border-neutral) pr-2">
            {order.products.length} Ürün
          </span>
          <span className="border-r border-(--border-neutral) px-2 max-w-27.5 truncate">
            Satıcı {order.sellerName}
          </span>
          <span className="pl-2">
            {formattedDate} {formattedTime}
          </span>
        </div>
      </div>

      {/* durum ve toplam bilgisi*/}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-sm">
        <div className="flex items-center gap-5">
          <span className="text-(--text-body) ">Durum:</span>
          <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
        </div>
        <div className="flex items-center gap-15">
          <span className="text-(--text-body) ">Toplam:</span>
          <span className="font-semibold">
            {order.currency}{order.totalAmount}
          </span>
        </div>
      </div>

      {/* order detail kısmı için detay butonu */}
      <Link href={`/user/orders/${order.id}`}>
        <Button
          text="Detay gör"
          textSize="sm"
          variant="dark"
          icon={<AngleRight className="w-4 h-4" />}
        />
      </Link>

    </div>
  );
};