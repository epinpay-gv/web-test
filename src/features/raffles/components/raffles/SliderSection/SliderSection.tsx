import Link from "next/link";
import { SliderSectionData } from "../../../raffle.types";
import RaffleCarousel from "./RaffleCarousel";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import { useMemo } from "react";
import DOMPurify from "dompurify";

interface SliderSectionProps {
  data: SliderSectionData;
  isBg?: boolean;
  onCardClick?: (card: Raffle) => void;
}
export default function SliderSection({
  data,
  isBg = true,
  onCardClick,
}: SliderSectionProps) {
  const title = useMemo(
    () =>
      typeof window !== "undefined"
        ? DOMPurify.sanitize(data.title)
        : data.title,
    [data.title],
  );

  return (
    <section
      className={`w-full p-4 md:p-20  ${isBg ? "bg-[url('/raffles-page/raffle-slider-bg.webp')] bg-cover bg-center" : ""}`}
    >


      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
          <h2 className="text-2xl font-semibold">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h2>
          <Link
            href="/raffles/all-raffles"
            className="text-(--text-fg-brand) text-sm hover:underline"
          >
            Tümünü gör
          </Link>
        </div>
        <RaffleCarousel data={data.raffles} onCardClick={onCardClick} />
      </div>
    </section>
  );
}
