import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Order,
  getOrderDisplayStatus,
  ORDER_DISPLAY_LABELS,
  ORDER_DISPLAY_COLORS,
} from "@/features/user/user.types";
import { AngleRight } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";
import { Copy, Check } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const displayStatus = getOrderDisplayStatus(order.status);
  const statusLabel = ORDER_DISPLAY_LABELS[displayStatus];
  const statusColor = ORDER_DISPLAY_COLORS[displayStatus];
  const [copied, setCopied] = useState(false);

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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(order.orderNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* DESKTOP GÖRÜNÜM */}
      <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) p-5 gap-3 hover:opacity-80 transition-opacity cursor-pointer">

        {/* Sol: sipariş bilgileri */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold text-(--text-white) truncate">
              Sipariş numarası: {order.orderNumber}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 text-(--text-body) hover:text-(--text-white) transition-colors"
              title="Sipariş numarasını kopyala"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-body)">
            <span className="border-r border-(--border-neutral) pr-2">
              {order.products.length} Ürün
            </span>
            <span className="border-r border-(--border-neutral) px-2 max-w-[110px] truncate">
              Satıcı {order.sellerName}
            </span>
            <span className="pl-2">
              {formattedDate} {formattedTime}
            </span>
          </div>
        </div>

        {/* Orta: durum ve toplam */}
        <div className="flex items-center gap-6 sm:flex-col sm:items-center sm:gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-(--text-body)">Durum:</span>
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-(--text-body)">Toplam:</span>
            <span className="font-semibold">{order.currency}{order.totalAmount}</span>
          </div>
        </div>

        {/* Sağ: detay butonu */}
        <Link href={`/user/orders/${order.id}`} className="self-end sm:self-auto">
          <Button
            text="Detay gör"
            textSize="sm"
            variant="dark"
            icon={<AngleRight className="w-4 h-4" />}
          />
        </Link>

      </div>

      {/* MOBİL GÖRÜNÜM */}
      <Link
        href={`/user/orders/${order.id}`}
        className="flex sm:hidden flex-col rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) p-5 gap-3 hover:opacity-80 transition-opacity cursor-pointer"
      >
        {/* Üst Kısım */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[16px] font-semibold text-(--text-white) truncate">
              Sipariş numarası: {order.orderNumber}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 text-(--text-body) hover:text-(--text-white) transition-colors"
              title="Sipariş numarasını kopyala"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
      <span className="flex items-center justify-center w-[32px] h-[32px] rounded-lg bg-(--bg-neutral-secondary-medium) border ">
            <AngleRight className="w-4 h-4 text-(--text-body)" />
          </span>
        </div>

        {/* Ürün - Satıcı ve Tarih Biglileri*/}
        <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-body)">
          <span className="border-r border-(--border-neutral) pr-2">
            {order.products.length} Ürün
          </span>
          <span className="border-r border-(--border-neutral) px-2 max-w-[110px] truncate">
            Satıcı {order.sellerName}
          </span>
          <span className="pl-2">
            {formattedDate} {formattedTime}
          </span>
        </div>

        {/* Durum ve Toplam*/}
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-(--text-body)">Sipariş Durumu</span>
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-(--text-body)">Toplam Tutar</span>
            <span className="font-semibold">{order.currency}{order.totalAmount}</span>
          </div>
        </div>
      </Link>
    </>
  );
};