import { RaffleCard } from "@/components/common";
import { BannerSectionData } from "@/features/raffles/raffle.types";

interface StreamerBannerRightProps {
  data: BannerSectionData[];
  selectedId: string;
}
export default function StreamerBannerRight({
  data,
  selectedId,
}: StreamerBannerRightProps) {
  const selectedCard = data.find((i) => {
    if (Array.isArray(i.raffle)) return false;
    return i.raffle.creatorId === selectedId;
  });
  return (
    <div>
      {selectedCard && !Array.isArray(selectedCard.raffle) && (
        <RaffleCard card={selectedCard.raffle} orientation="horizontal" />
      )}
    </div>
  );
}
