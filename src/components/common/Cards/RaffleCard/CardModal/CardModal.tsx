import { JoinRaffleApiPayload } from "@/features/raffles/raffle.types";
import { StoreInfo } from "../CardSections";
import ImageSection from "./ImageSection";
import InfoSection from "./InfoSection";
import ParticipantSection from "./ParticipantSection";
import { Raffle } from "@/types/types";

interface CardModalProps {
  data: Raffle;
  joinToTheRaffle: (payload: JoinRaffleApiPayload) => Promise<void>
}

export default function CardModal({ data, joinToTheRaffle }: CardModalProps) {
  return (
    <div className="space-y-6">
      {/* INFO */}
      <section className="flex justify-between gap-0 md:gap-6">
        <ImageSection data={data} />
        <InfoSection card={data} joinToTheRaffle={joinToTheRaffle}/>
      </section>

      {/* DESCRIPTION */}
      <section className="text-xs font-normal leading-[150%] text-(--text-heading)">{data.description}</section>

      {/* PARTICIPANTS */}
      <ParticipantSection card={data}/>

      {/* FOOTER */}
      <StoreInfo card={data}/>

    </div>
  );
}
