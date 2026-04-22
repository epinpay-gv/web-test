"use client";
import { Modal } from "@/components/common";
import CardModal from "@/components/common/Cards/RaffleCard/CardModal/CardModal";
import {
  BannerSection,
  StreamerBannerRight,
  StreamerBannerLeft,
} from "@/features/raffles/components";
import { useRaffleActions } from "@/features/raffles/hooks";
import {
  BannerSectionData,
} from "@/features/raffles/raffle.types";
import { Raffle } from "@/types/types";
import { useState } from "react";

interface StreamerRafflesSectionProps {
  data: BannerSectionData[];
}

export default function StreamerRafflesSection({
  data,
}: StreamerRafflesSectionProps) {
  const { joinToTheRaffle } = useRaffleActions();

  const streamerIndex =  Math.floor(data.length / 2);
  const [selectedStreamer, setSelectedStreamer] = useState(
    data[streamerIndex]?.id ?? 0
  );
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);

  const handleStreamerChange = (id: string) => {
    return setSelectedStreamer(id);
  };

  return (
    <>
      <BannerSection
        accentColor="#8B0836"
        left={
          <StreamerBannerLeft
            data={data}
            selectedId={selectedStreamer}
            onSelect={handleStreamerChange}
          />
        }
        right={
          <StreamerBannerRight
            data={data}
            selectedId={selectedStreamer}
            onCardClick={(raffle) => setSelectedRaffle(raffle)}
          />
        }
      />

      {/* MODAL */}
      <Modal open={!!selectedRaffle} onClose={() => setSelectedRaffle(null)}>
        {selectedRaffle && (
          <CardModal data={selectedRaffle} joinToTheRaffle={joinToTheRaffle} />
        )}
      </Modal>
    </>
  );
}
