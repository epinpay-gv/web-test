/* eslint-disable @typescript-eslint/no-unused-expressions */
// renderedRafflesda hata veriyordu, o yüzden eklendi
import { RaffleCard } from "@/components/common";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import { BannerSectionData } from "@/features/raffles/raffle.types";

interface FeaturedBannerLeftProps {
  data: BannerSectionData;
  onCardClick?: ((card: Raffle) => void) | undefined
}
export default function FeaturedBannerLeft({ data, onCardClick }: FeaturedBannerLeftProps) {
  const { raffle } = data;
  let renderedRaffles: Raffle[] = [];

  Array.isArray(raffle)
    ? (renderedRaffles = raffle.slice(0, 3))
    : (renderedRaffles = []);

  return (
    <div className="flex gap-4">
      {renderedRaffles.map((item) => (
        <RaffleCard key={item.id} card={item} type="default" onCardClick={onCardClick}/>
      ))}
    </div>
  );
}
