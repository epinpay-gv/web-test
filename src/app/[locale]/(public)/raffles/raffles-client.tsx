"use client";
import { Modal } from "@/components/common";
import CardModal from "@/components/common/Cards/RaffleCard/CardModal/CardModal";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import {
  BannerSection,
  MainBannerLeft,
  MainBannerRight,
  SliderSection,
  StreamerBannerRight,
  StreamerBannerLeft,
  FeaturedBannerRight,
  FeaturedBannerLeft,
  DescriptionCards,
  Winners,
  FAQSection,
} from "@/features/raffles/components";
import { useRaffleActions } from "@/features/raffles/hooks";
import {
  Winner,
  SliderSectionData,
  BannerSectionData,
} from "@/features/raffles/raffle.types";
import { FAQ } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

interface RafflesClientProps {
  data: {
    activeParticipantCount: number;
    winners: Winner[];
    faq: FAQ[];
    sliders: SliderSectionData[];
    banners: {
      featured: BannerSectionData;
      streamers: BannerSectionData[];
    };
  };
}

export default function RafflesClientPage({ data }: RafflesClientProps) {
  const { joinToTheRaffle } = useRaffleActions();

  const slider1Data = data.sliders.find((i) => i.line === 1);
  const slider2Data = data.sliders.find((i) => i.line === 2);
  const slider3Data = data.sliders.find((i) => i.line === 3);

  const streamerIndex = Math.floor(data.banners.streamers.length / 2);
  const [selectedStreamer, setSelectedStreamer] = useState(
    data.banners.streamers[streamerIndex].id,
  );
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);

  const handleStreamerChange = (id: string) => {
    return setSelectedStreamer(id);
  };

  return (
    <>
      {/* MAIN BANNER */}
      <BannerSection
        background="brand"
        left={<MainBannerLeft data={data.activeParticipantCount} />}
        right={<MainBannerRight />}
      />
      
      {/* PREMIUM SLIDER */}
      {slider1Data && (
        <SliderSection
          data={slider1Data}
          onCardClick={(raffle) => setSelectedRaffle(raffle)}
        />
      )}

      {/* STREAMER BANNER */}
      <BannerSection
        background="with-light"
        accentColor="#8B0836"
        left={
          <StreamerBannerLeft
            data={data.banners.streamers}
            selectedId={selectedStreamer}
            onSelect={handleStreamerChange}
          />
        }
        right={
          <StreamerBannerRight
            data={data.banners.streamers}
            selectedId={selectedStreamer}
            onCardClick={(raffle) => setSelectedRaffle(raffle)}
          />
        }
      />

      {/* REFERENCE SLIDER */}
      {slider2Data && (
        <SliderSection
          data={slider2Data}
          onCardClick={(raffle) => setSelectedRaffle(raffle)}
        />
      )}

      {/* EPINPAY BANNER */}
      <BannerSection
        background="with-light"
        accentColor="#615FFF"
        left={<FeaturedBannerLeft data={data.banners.featured} onCardClick={(raffle) => setSelectedRaffle(raffle)}/>}
        right={<FeaturedBannerRight data={data.banners.featured} />}
        
      />

      <div className="relative flex flex-col gap-4 pt-20 items-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src="/raffles-page/bg-texture.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover pointer-events-none select-none"
          style={{
            opacity: 0.5,
            mixBlendMode: "luminosity",
          }}
        />
        <div className="relative z-10 w-full flex flex-col gap-4 items-center">
          {/* CARDS */}
          <DescriptionCards
            activeParticipantCount={data.activeParticipantCount}
          />

          {/* EPINPAY SLIDER */}
          {slider3Data && (
            <SliderSection
              data={slider3Data}
              isBg={false}
              onCardClick={(raffle) => setSelectedRaffle(raffle)}
            />
          )}

          {/* WINNERS */}
          <Winners data={data.winners} />

          {/* FAQ */}
          <FAQSection data={data.faq} />

          {/* FOOTER IMAGE */}
          <div className="relative w-full h-88.25">
            <Image
              src="/raffles-page/raffles-footer.webp"
              alt="Raffle Cards"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={!!selectedRaffle} onClose={() => setSelectedRaffle(null)}>
        {selectedRaffle && (
          <CardModal data={selectedRaffle} joinToTheRaffle={joinToTheRaffle} />
        )}
      </Modal>
    </>
  );
}
