import { RaffleCard } from "@/components/common";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import { BannerSectionData } from "@/features/raffles/raffle.types";

interface StreamerBannerRightProps {
  data: BannerSectionData[];
  selectedId: string;
  onCardClick?: ((card: Raffle) => void) | undefined
}
export default function StreamerBannerRight({
  data,
  selectedId,
  onCardClick,
}: StreamerBannerRightProps) {
  const selectedCard = data.find((i) => {
    if (Array.isArray(i.raffle)) return false;
    return i.raffle.creatorId === selectedId;
  });
  return (
    <div className="px-4 md:px-0">
      {selectedCard && !Array.isArray(selectedCard.raffle) && (
        <RaffleCard card={selectedCard.raffle} orientation="horizontal" onCardClick={onCardClick}/>
      )}
    </div>
  );
}
