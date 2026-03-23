/* eslint-disable @typescript-eslint/no-unused-expressions */
// renderedRafflesda hata veriyordu, o yüzden eklendi
import { RaffleCard } from "@/components/common";
import { BannerSectionData } from "@/features/raffles/raffle.types";
import RaffleCarousel from "../../SliderSection/RaffleCarousel";
import { Raffle } from "@/types/types";

interface FeaturedBannerLeftProps {
  data: BannerSectionData;
  onCardClick?: ((card: Raffle) => void) | undefined;
}
export default function FeaturedBannerLeft({
  data,
  onCardClick,
}: FeaturedBannerLeftProps) {
  const { raffle } = data;
  let renderedRaffles: Raffle[] = [];

  Array.isArray(raffle)
    ? (renderedRaffles = raffle.slice(0, 3))
    : (renderedRaffles = []);

  return (
    <div className="w-full">
      <RaffleCarousel
        data={renderedRaffles}
        onCardClick={onCardClick}
        type="default"
      />
    </div>
  );
}
