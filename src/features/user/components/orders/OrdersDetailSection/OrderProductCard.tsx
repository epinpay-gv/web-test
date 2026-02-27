"use client";

import Image from "next/image";
import {
  OrderProduct,
  CODE_STATUS_LABELS,
  CODE_STATUS_COLORS,
  PRODUCT_CATEGORY_LABELS,
} from "@/features/user/user.types";
import { Button } from "@/components/common";
import { useState } from "react";

interface OrderProductCardProps {
  product: OrderProduct;
}

export const OrderProductCard = ({ product }: OrderProductCardProps) => {
  const [copied, setCopied] = useState(false);

  const codeStatusLabel = product.codeStatus
    ? CODE_STATUS_LABELS[product.codeStatus]
    : null;
  const codeStatusColor = product.codeStatus
    ? CODE_STATUS_COLORS[product.codeStatus]
    : "";

  const handleCopyCode = () => {
    if (!product.code) return;
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelivered = () => {
    // TODO: API entegrasyonu — PATCH /orders/products/{id}/confirm
    console.log("Ürün teslim alındı onaylandı:", product.id);
  };

  const handleNotDelivered = () => {
    // TODO: API entegrasyonu — POST /orders/products/{id}/dispute
    console.log("Ürün teslim alınmadı bildirildi:", product.id);
  };

  return (
    <div className=" bg-(--bg-neutral-primary-soft)  p-4 border-b flex items-center gap-4 ">

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

      <div className="flex flex-col gap-1 ">
        {/* Ürün İsmi */}
        <span className="w-83.5 text-sm font-semibold text-(--text-body) line-clamp-2 wrap-break-words">
          {product.name}
        </span>
        {/* Ürün Açıklaması */}
        {product.description && (
          <span className="text-xs text-(--text-body) truncate">
            {product.description}
          </span>
        )}
        {/* Kategori + Region + Fiyat */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-body) ">
          <span className="inline-flex items-center justify-center gap-1 bg-(--bg-neutral-primary-soft) border border-(--border-default) px-1 py-0.5 rounded-sm">
            {PRODUCT_CATEGORY_LABELS[product.category]}
          </span>
          {product.region && (
            <span className="truncate max-w-30">
              {product.region}
            </span>
          )}
          <span className="font-semibold mx-auto">{product.currency}{product.price}</span>
        </div>
      </div>

      {/* Sipariş Durumu Etiketi */}
      <div className="flex flex-col items-center gap-1 shrink-0 ">
        <span className="text-xs text-(--text-body)">Sipariş durumu</span>
        {codeStatusLabel && (
          <span className={`text-sm font-medium ${codeStatusColor}`}>
            {codeStatusLabel}
          </span>
        )}
      </div>

      {/* Sağ Aksiyon Alanı */}
      <div className="flex mx-auto pl-20">

        {/* DURUM 1: Kod teslim edildi → Kod kutusu göster */}
        {product.codeStatus === "DELIVERED" && product.code && (
          <div className="flex flex-col gap-2 items-end">
            {/* Kod Kutusu */}
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--bg-success-soft) border border-(--border-success) hover:opacity-80 transition-opacity"
            >
              <span className="text-sm font-mono text-(--text-fg-success-strong) tracking-widest">
                {copied ? "Kopyalandı!" : product.code}
              </span>
            </button>
            {/* Nasıl Kullanırım */}
            {product.howToUseUrl && product.howToUseUrl !== "#" ? (
              <a
                href={product.howToUseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-(--text-body) underline underline-offset-2 hover:text-(--text-white) transition-colors"
              >
                Nasıl kullanırım? <span className="text-(--text-fg-brand)">incele</span>
              </a>
            ) : (
              <span className="text-xs text-(--text-body)">
                Nasıl kullanırım?{" "}
                <span className="text-(--text-fg-brand) cursor-pointer">incele</span>
              </span>
            )}
          </div>
        )}

        {/* DURUM 2: Beklemede + Aktivasyon gerekiyor → Teslim aldın mı? */}
        {product.codeStatus === "PENDING" && product.requiresActivation && (
          <div className="flex flex-col gap-2 items-end">
            <span className="text-xs text-(--text-body)">Ürünü teslim aldınız mı?</span>
            <div className="flex items-center gap-2">
              <Button
                text="Teslim Aldım"
                textSize="sm"
                variant="success"
                onClick={handleDelivered}
              />
              <Button
                text="Teslim Almadım"
                textSize="sm"
                variant="danger"
                onClick={handleNotDelivered}
              />
            </div>
            {product.howToUseUrl && (
              <span className="text-xs text-(--text-body)">
                Nasıl kullanırım?{" "}
                <span className="text-(--text-fg-brand) cursor-pointer">incele</span>
              </span>
            )}
          </div>
        )}

        {/* DURUM 3: Beklemede + Aktivasyona gerek yok */}
        {product.codeStatus === "PENDING" && !product.requiresActivation && null}

        {/* DURUM 4: İptal edildi → aksiyon yok*/}
        {product.codeStatus === "CANCELLED" && null}
      </div>
    </div>
  );
};