"use client";

import Image from "next/image";
import {
  OrderProduct,
  CODE_STATUS_LABELS,
  CODE_STATUS_COLORS,
  PRODUCT_CATEGORY_LABELS,
} from "@/features/user/user.types";
import { Button } from "@/components/common";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { useOrderProductStatus } from "@/features/user/hooks/orders/useOrderProductStatus";


interface OrderProductCardProps {
  product: OrderProduct;
}

export const OrderProductCard = ({ product }: OrderProductCardProps) => {
  const {
    copied,
    codeVisible,
    setCodeVisible,
    deliveryState,
    maskedCode,
    handleCopyCode,
    handleDelivered,
    handleNotDelivered,
    showDeliveryCard,
    showCodeBox,
  } = useOrderProductStatus(product);

  const codeStatusLabel = product.codeStatus
    ? CODE_STATUS_LABELS[product.codeStatus]
    : null;

  const codeStatusColor = product.codeStatus
    ? CODE_STATUS_COLORS[product.codeStatus]
    : "";

  return (
    <div className="bg-(--bg-neutral-primary-soft) p-4 border-b flex items-center gap-4">
      {/* Ürün Görseli */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-(--bg-neutral-secondary)">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="flex flex-col gap-1">
        <span className="w-83.5 text-sm font-semibold text-(--text-body) line-clamp-2 wrap-break-words">
          {product.name}
        </span>

        {product.description && (
          <span className="text-xs text-(--text-body) truncate">
            {product.description}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-body)">
          <span className="inline-flex items-center justify-center gap-1 bg-(--bg-neutral-primary-soft) border border-(--border-default) px-1 py-0.5 rounded-sm">
            {PRODUCT_CATEGORY_LABELS[product.category]}
          </span>

          {product.region && (
            <span className="truncate max-w-30">{product.region}</span>
          )}

          <span className="font-semibold mx-auto">
            {product.currency}
            {product.price}
          </span>
        </div>
      </div>

      {/* Sipariş Durumu */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-(--text-body)">Sipariş durumu</span>

        {codeStatusLabel && (
          <span className={`text-sm font-medium ${codeStatusColor}`}>
            {codeStatusLabel}
          </span>
        )}
      </div>

      {/* Sağ Aksiyon Alanı */}
      <div className="flex ml-auto">
        {/* DURUM 1: Kod teslim edildi */}
        {showCodeBox && (
          <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
            <span className="text-(--text-body) text-sm">ürün kodu</span>

            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-(--bg-success)">
              <Button
                icon={
                  copied ? (
                    <Check size={13} className="text-white" />
                  ) : (
                    <Copy size={13} className="text-white" />
                  )
                }
                size="xs"
                variant="ghost"
                appearance="filled"
                padding="rounded"
                title="Kopyala"
                onClick={handleCopyCode}
              />

              <span className="text-sm font-mono text-white tracking-widest select-all">
                {codeVisible ? product.code : maskedCode}
              </span>

              <Button
                icon={
                  codeVisible ? (
                    <EyeOff size={13} className="text-white" />
                  ) : (
                    <Eye size={13} className="text-white" />
                  )
                }
                size="xs"
                variant="ghost"
                appearance="filled"
                padding="rounded"
                title={codeVisible ? "Gizle" : "Göster"}
                onClick={() => setCodeVisible((v) => !v)}
              />
            </div>

            <HowToUse url={product.howToUseUrl} />
          </div>
        )}

        {/* DURUM 2: Beklemede + Aktivasyon gerekiyor */}
        {showDeliveryCard && (
          <div className="flex flex-col gap-2 items-end p-2 border-2 border-dashed border-(--border-brand-light) w-[265px] h-[98px] bg-(--bg-brand-softer) rounded-xl">
            <span className="text-xs text-(--text-body)">
              Ürünü teslim aldınız mı?
            </span>

            <div className="flex items-center gap-2">
              <Button
                text="Teslim Aldım"
                textSize="xs"
                variant="success"
                disabled={deliveryState === "not_delivered"}
                onClick={handleDelivered}
                className="rounded-2xl"
              />

              <Button
                text="Teslim Almadım"
                textSize="xs"
                variant="warning"
                disabled={deliveryState === "delivered"}
                onClick={handleNotDelivered}
                className="whitespace-nowrap rounded-2xl"
              />
            </div>

            {deliveryState === "pending" && (
              <button className="flex items-end gap-1 text-xs text-(--text-fg-brand)">
                Sorun bildir
              </button>
            )}

            {deliveryState === "delivered" && (
              <HowToUse url={product.howToUseUrl} />
            )}

            {deliveryState === "not_delivered" && (
              <span className="flex items-center gap-1.5 text-xs text-(--text-fg-warning)">
                Destek talebi inceleniyor
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function HowToUse({ url }: { url?: string }) {
  const inner = (
    <>
      Nasıl kullanırım? <span className="text-(--text-fg-brand)">incele</span>
    </>
  );

  if (url && url !== "#") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-(--text-body) hover:opacity-80 transition-opacity"
      >
        {inner}
      </a>
    );
  }

  return (
    <span className="text-xs text-(--text-body) cursor-pointer">{inner}</span>
  );
}