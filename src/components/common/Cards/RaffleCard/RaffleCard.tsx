import { ImageSection, CardInfo, ActionButtons, StoreInfo } from "./CardSections";

interface RaffleCardProps {
  card: string;
}

export default function RaffleCard({  }: RaffleCardProps) {


  return (
    <div className="">
        <ImageSection/>
        <CardInfo/>
        <ActionButtons/>
        <StoreInfo/>
    </div>
  );
}
