"use client";

import Image from "next/image";
import {
  OrderProduct,
  PRODUCT_CATEGORY_LABELS,
  getItemDisplayStatus,
  ITEM_DISPLAY_LABELS,
  ITEM_DISPLAY_COLORS,
} from "@/features/user/user.types";
import { Button } from "@/components/common";
import { Copy, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { useOrderProductStatus } from "@/features/checkout/hooks/useOrderProductStatus";

interface OrderProductCardProps {
  orderId: string;
  product: OrderProduct;
}

export const OrderProductCard = ({ orderId, product: initialProduct }: OrderProductCardProps) => {
  const {
    product,
    copied,
    codeVisible,
    setCodeVisible,
    isLoading,
    maskedCode,
    topUpSelection,
    handleCopyCode,
    handleConfirm,
    handleDispute,
    showCodeBox,
    showTopUpActions,
  } = useOrderProductStatus(orderId, initialProduct);

  const displayStatus = getItemDisplayStatus(product.status);
  const statusLabel = ITEM_DISPLAY_LABELS[displayStatus];
  const statusColor = ITEM_DISPLAY_COLORS[displayStatus];

  const hasCustomAction = showCodeBox || showTopUpActions;

  return (
    <div className="bg-(--bg-neutral-primary-soft) p-4 border-b flex items-center gap-4">
      {/* Ürün Görseli */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-(--bg-neutral-secondary) flex-shrink-0">
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
      <div className="flex flex-col gap-1 flex-grow min-w-0">
        <span className="text-sm font-semibold text-(--text-body) line-clamp-2 break-words">
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

          <span className="font-semibold">
            {product.currency}{product.price}
          </span>
        </div>
      </div>

      {/* Sipariş Durumu */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span className="text-xs text-(--text-body)">Sipariş durumu</span>
        <span className={`text-sm font-medium ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Sağ Aksiyon Alanı */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[200px]">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-(--text-body)" />
        ) : hasCustomAction ? (
          <>
            {/* TOP_UP Actions (Confirm/Dispute) */}
            {showTopUpActions && (
              <div className="flex flex-col gap-2 items-end border-2 border-dashed border-(--border-brand-light) bg-(--bg-brand-softer) rounded-xl px-4 py-3">
                <span className="text-(--text-body) text-sm">Ürünü teslim aldınız mı?</span>
                <div className="flex items-center gap-2">
                  <Button
                    text="Teslim Aldım"
                    textSize="xs"
                    variant="success"
                    onClick={handleConfirm}
                    disabled={topUpSelection === "disputed"}
                    className="rounded-2xl"
                  />
                  <Button
                    text="Teslim Almadım"
                    textSize="xs"
                    variant="warning"
                    onClick={() => handleDispute()}
                    disabled={topUpSelection === "confirmed"}
                    className="whitespace-nowrap rounded-2xl"
                  />
                </div>
                {topUpSelection === "disputed" ? (
                  <button
                    type="button"
                    onClick={() => {/* TODO: sorun bildir modalını aç */}}
                    className="text-xs text-(--text-fg-brand) hover:opacity-80 transition-opacity"
                  >
                    sorun bildir
                  </button>
                ) : (
                  <span className="text-xs text-(--text-body)">
                    Nasıl kullanırım?{" "}
                    <span className="text-(--text-fg-brand)">incele</span>
                  </span>
                )}
              </div>
            )}

            {/* EPIN Code Box */}
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
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};