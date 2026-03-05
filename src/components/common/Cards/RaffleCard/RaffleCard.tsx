import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";

interface RaffleCardProps {
  card: Raffle;
}

export default function RaffleCard({ card }: RaffleCardProps) {


  return (
    <div className="w-56 h-117.5 rounded-xl border border-(--border-default) bg-(--bg-neutral-primary) flex flex-col justify-between gap-4">
        <ImageSection card={card}/>
        <CardInfo card={card}/>
        <StoreInfo card={card}/>
    </div>
  );
}
