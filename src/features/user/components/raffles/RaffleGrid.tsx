"use client";
import Image from "next/image";
import { Button, RaffleCard } from "@/components/common";
import { useTranslations } from "next-intl";
import { Raffle } from "@/types/types";

interface RaffleGridProps {
  data: Raffle[];
  isLoading?: boolean;
  onCardClick?: (card: Raffle) => void;
}

export default function RaffleGrid({
  data,
  isLoading = false,
  onCardClick
}: RaffleGridProps) {
  const t = useTranslations("common.messages");
  const tBtn = useTranslations("common.buttons");

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-max">
          {data.map((card, index) => (
            <RaffleCard card={card} key={index} onCardClick={onCardClick}/>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 min-h-screen">
          <Image
            src="/illustrations/gaming-controller-ghosts-dark.svg"
            alt="product-not-found"
            className="object-contain"
            width={300}
            height={300}
          />
          <div className="text-xl font-semibold">{t("productNotFound")}</div>
          <div className="text-sm font-normal">{t("productNotFoundDesc")}</div>
          <Button
            padding="sm"
            textSize="sm"
            text={tBtn("viewAllProductsBtn")}
            variant="brand"
            onClick={() => {}}
            className="max-w-48"
          />
        </div>
      )}
    </>
  );
}
