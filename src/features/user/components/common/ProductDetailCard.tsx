"use client";
import { BffOrderItem } from "@/features/user/user.types";
import { useOrderProductStatus } from "../../hooks/useOrderProductStatus";
import ActionBox from "./ProductDetailCardSections/ActionBox";
import CardInfo from "./ProductDetailCardSections/CardInfo";
import CardStatus from "./ProductDetailCardSections/CardStatus";

interface ProductDetailCardProps {
  orderId: string;
  product: BffOrderItem;
}

export default function ProductDetailCard({ orderId, product }: ProductDetailCardProps) {
  const {
    copiedIndex,
    codeVisible,
    setCodeVisible,
    epinCodes,
    topUpSelection,
    handleCopyCode,
    handleViewEpin,
    handleConfirm,
    handleDispute,
  } = useOrderProductStatus(orderId, product);

  return (
    <div className="p-4 border-b flex flex-col md:flex-row md:justify-between gap-4">
      <div className="flex justify-between flex-col md:flex-row gap-2">
        <CardInfo product={product} />
        <CardStatus product={product} />
      </div>
      <ActionBox
        copiedIndex={copiedIndex}
        handleCopyCode={handleCopyCode}
        handleConfirm={handleConfirm}
        handleDispute={handleDispute}
        handleViewEpin={handleViewEpin}
        codeVisible={codeVisible}
        setCodeVisible={setCodeVisible}
        product={product}
        epinCodes={epinCodes}
        topUpSelection={topUpSelection ?? undefined}
      />
    </div>
  );
}
