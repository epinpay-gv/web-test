"use client";

import {
  Order,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  INVOICE_STATUS_LABELS,
} from "@/features/user/user.types";
import { Button } from "@/components/common";
import { AngleLeft } from "flowbite-react-icons/outline";
import { CheckCircle, FileCopy, FileInvoice } from "flowbite-react-icons/solid";
import Link from "next/link";

interface OrderDetailHeaderProps {
  order: Order;
}

export const OrderDetailHeader = ({ order }: OrderDetailHeaderProps) => {
  const statusLabel = ORDER_STATUS_LABELS[order.status];
  const statusColor = ORDER_STATUS_COLORS[order.status];

  const createdAt = new Date(order.createdAt);
  const formattedDate = createdAt.toLocaleDateString("tr-TR");
  const formattedTime = createdAt.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const truncatedSellerName =
    order.sellerName.length > 8
      ? order.sellerName.slice(0, 8) + "…"
      : order.sellerName;

  const handleInvoiceRequest = () => {
    console.log("Fatura talep edildi:", order.id);
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
  };

  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) p-5 flex flex-col gap-4">

      {/* Üst Ana Alan - 3 Kolon */}
      <div className="grid grid-cols-3 items-center">

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
            <span className="text-[16px] font-semibold text-(--text-white)">
              Sipariş numarası: {order.orderNumber}
            </span>
            <button
              onClick={handleCopyOrderNumber}
              className="text-(--text-body) hover:text-(--text-white) transition-colors"
              title="Kopyala"
            >
              <FileCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ORTA: Sipariş Durumu + Toplam */}
        <div className="flex justify-center">
          <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-sm">
            <span className="text-(--text-body)">Sipariş Durumu:</span>
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>

            <span className="text-(--text-body)">Toplam Tutar:</span>
            <span className="font-semibold text-(--text-white)">
              {order.currency}{order.totalAmount}
            </span>
          </div>
        </div>

        {/* SAĞ: Fatura */}
        <div className="flex justify-end">
          {order.invoiceStatus === "NONE" && (
            <Button
              text="Fatura talep et"
              textSize="sm"
              variant="dark"
              padding="sm"
              size="full"
              icon={<FileInvoice className="w-[9.33] h-[11.67]" />}
              onClick={handleInvoiceRequest}
              className="w-auto! rounded-2xl border border-(--border-default-medium)"
            />
          )}

          {order.invoiceStatus === "REQUESTED" && (
            <span className="text-xs text-(--text-body) px-3 py-1.5 rounded-lg bg-(--bg-neutral-secondary)">
              {INVOICE_STATUS_LABELS.REQUESTED} 
            </span>
          )}

          {order.invoiceStatus === "APPROVED" && (
            <span className="text-xs text-(--text-fg-success-strong) flex items-center gap-1 px-3 py-1.5 rounded-lg bg-(--bg-neutral-secondary)">
              <CheckCircle className="w-3.5 h-3.5" />
              {INVOICE_STATUS_LABELS.APPROVED}
            </span>
          )}
        </div>
      </div>

      {/* ALT META SATIRI */}
      <div className="flex items-center gap-2 text-sm text-(--text-body)">
        <span className="border-r border-(--border-neutral) pr-2">
          {order.products.length} Ürün
        </span>
        <span className="border-r border-(--border-neutral) pr-2">
          Satıcı{" "}
          <span className="font-medium" title={order.sellerName}>
            {truncatedSellerName}
          </span>
        </span>
        <span>
          {formattedDate} {formattedTime}
        </span>
      </div>

    </div>
  );
};