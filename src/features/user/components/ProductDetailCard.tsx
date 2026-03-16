import Image from "next/image";
import { OrderProduct, TopupResponsePayload } from "@/features/user/user.types";
import { Button } from "@/components/common";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { useOrderProductStatus } from "../hooks/useOrderProductStatus";
import {
  getItemDisplayStatus,
  ITEM_DISPLAY_LABELS,
  ITEM_DISPLAY_COLORS,
  PRODUCT_CATEGORY_LABELS,
} from "@/features/user/utils/status.mappers";
import ActionBox from "./ProductDetailCardSections/ActionBox";
import { SetStateAction } from "react";
import CardInfo from "./ProductDetailCardSections/CardInfo";
import CardStatus from "./ProductDetailCardSections/CardStatus";

interface ProductDetailCardProps {
  orderId: string;
  product: OrderProduct;
}

export default function ProductDetailCard({
  orderId,
  product,
}: ProductDetailCardProps) {
  const {
    copied,
    codeVisible,
    setCodeVisible,
    maskedCode,
    topUpSelection,
    handleCopyCode,
    handleConfirm,
    handleDispute,
    showCodeBox,
    showTopUpActions,
  } = useOrderProductStatus(orderId, product);

  return (
    <div className="bg-(--bg-neutral-primary-soft) p-4 border-b flex flex-col gap-4">
      {/* DESKTOP GÖRÜNÜM */}
      <div className="hidden sm:flex sm:flex-row sm:items-center gap-4">
        {/* Görsel + Bilgi */}
        <CardInfo product={product}/>

        {/* Durum + Aksiyon */}
        <div className="flex flex-row items-center justify-end gap-4 shrink-0">
          {/* <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs text-(--text-body)">Sipariş durumu</span>
            <span className={`text-sm font-medium ${statusColor}`}>
              {statusLabel}
            </span>
          </div> */}
        <CardStatus product={product}/>

          <ActionBox
            type={"topup"}
            copied={copied}
            handleCopyCode={handleCopyCode}
            handleConfirm={handleConfirm}
            handleDispute={handleDispute}
            codeVisible={codeVisible}
            setCodeVisible={setCodeVisible}
            product={product}
            maskedCode={maskedCode}
          />
        </div>
      </div>

      {/* MOBİL GÖRÜNÜM */}
      <div className="flex sm:hidden flex-col gap-3">
        {/*Görsel + Ürün bilgileri */}
        <div className="flex items-center gap-4">
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

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="text-sm font-semibold text-(--text-body) line-clamp-2 break-words">
              {product.name}
            </span>

            {product.description && (
              <span className="text-xs text-(--text-body) truncate">
                {product.description}
              </span>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-body)">
              <span className="inline-flex items-center gap-1 bg-(--bg-neutral-primary-soft) border border-(--border-default) px-1 py-0.5 rounded-sm">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </span>
              {product.region && (
                <span className="truncate max-w-30">{product.region}</span>
              )}
              <span className="font-bold ml-auto">
                {product.currency}
                {product.price}
              </span>
            </div>
          </div>
        </div>

        {/*  Sipariş durumu */}
        <CardStatus product={product}/>
        {/* Aktivasyon kutusu */}
        <ActionBox
          type={"topup"}
          copied={copied}
          handleCopyCode={handleCopyCode}
          handleConfirm={handleConfirm}
          handleDispute={handleDispute}
          codeVisible={codeVisible}
          setCodeVisible={setCodeVisible}
          product={product}
          maskedCode={maskedCode}
        />
      </div>
    </div>
  );
}
