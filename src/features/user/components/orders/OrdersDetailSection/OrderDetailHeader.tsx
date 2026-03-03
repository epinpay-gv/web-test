"use client";

import { useMemo, useState } from "react";
import {
  Order,
  getOrderDisplayStatus,
  ORDER_DISPLAY_LABELS,
  ORDER_DISPLAY_COLORS,
} from "@/features/user/user.types";
import { Button } from "@/components/common";
import { AngleLeft, FileCopy } from "flowbite-react-icons/outline";
import { CheckCircle } from "flowbite-react-icons/solid";
import Link from "next/link";

interface OrderDetailHeaderProps {
  order: Order;
}

export const OrderDetailHeader = ({ order }: OrderDetailHeaderProps) => {
  const [copied, setCopied] = useState(false);

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

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary-soft) p-2 flex flex-col gap-3">
      {/* Üst Ana Alan - 3 Kolon */}
      <div className="grid grid-cols-3 items-start">
        {/* SOL: Geri + Sipariş No */}
        <div className="flex items-center gap-3">
          <Link href="/user/orders">
            <Button
              icon={<AngleLeft className="text-(--text-body) w-4 h-4" />}
              size="xs"
              variant="dark"
              padding="rounded"
              className="rounded-xl bg-(--bg-neutral-secondary-medium) border border-(--border-default-medium)"
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="text-[16px] font-semibold text-(--text-white) whitespace-nowrap">
              Sipariş numarası: {order.orderNumber}
            </span>
            <Button
              onClick={handleCopyOrderNumber}
              icon={
                copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <FileCopy className="w-4 h-4" />
                )
              }
              variant="secondary"
              appearance="outline"
              size="xs"
              padding="rounded"
              className="w-[22px] h-[22px] p-1 rounded-full border bg-(--bg-neutral-secondary-medium) text-(--text-body) border-(--border-default-medium) transition-colors"
              title={copied ? "Kopyalandı!" : "Kopyala"}
            />
          </div>
        </div>

        {/* ORTA: Sipariş Durumu + Toplam */}
        <div className="flex justify-center">
          <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-sm">
            <span className="text-(--text-body)">Sipariş Durumu:</span>
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>

            <span className="text-(--text-body)">Toplam Tutar:</span>
            <span className="font-semibold text-(--text-white)">
              {order.currency}
              {order.totalAmount}
            </span>
          </div>
        </div>

    
      </div>

      {/* Alt Meta Satırı */}
      <div className="flex items-center gap-2 text-sm text-(--text-body)">
        <span className="border-r border-(--border-neutral) pr-2">
          {order.products.length} Ürün
        </span>
        <span className="border-r border-(--border-neutral) pr-2">
          Satıcı{" "}
          <span
            className="font-medium inline-block max-w-[72px] truncate align-bottom"
            title={order.sellerName}
          >
            {order.sellerName}
          </span>
        </span>
        <span>
          {formattedDate} {formattedTime}
        </span>
      </div>
    </div>
  );
};