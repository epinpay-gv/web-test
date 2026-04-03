"use client";
import { Modal } from "@/components/common";
import CardModal from "@/components/common/Cards/RaffleCard/CardModal/CardModal";
import { SliderSection } from "@/features/raffles/components";
import { useRaffleActions } from "@/features/raffles/hooks";
import { SliderSectionData } from "@/features/raffles/raffle.types";
import { Raffle } from "@/types/types";
import { useState } from "react";

interface EpinpayRafflesSectionProps {
  data: SliderSectionData;
}

export default function EpinpayRafflesSection({ data }: EpinpayRafflesSectionProps) {
  const { joinToTheRaffle } = useRaffleActions();

  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);

  return (
    <>
      {/* EPINPAY SLIDER */}
      <SliderSection
        data={data}
        isBg={false}
        onCardClick={(raffle) => setSelectedRaffle(raffle)}
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
