"use client";

import {
  BannerSection,
  MainBannerLeft,
  MainBannerRight,
  SliderSection,
} from "@/features/raffles/components";
import {
  Winner,
  SliderSectionData,
  BannerSectionData,
} from "@/features/raffles/raffle.types";
import { FAQ } from "@/types/types";

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
  const { activeParticipantCount, winners, faq, sliders, banners } = data;
  const { featured, streamers } = banners;

  const slider1Data = sliders.find((i) => i.line === 1);
  const slider2Data = sliders.find((i) => i.line === 2);
  const slider3Data = sliders.find((i) => i.line === 3);

  return (
    <>
      <BannerSection
        background="brand"
        left={<MainBannerLeft data={activeParticipantCount} />}
        right={<MainBannerRight />}
      />
      {slider1Data && <SliderSection data={slider1Data} />}
      {/* <BannerSection /> */}
      {slider2Data && <SliderSection data={slider2Data} />}

      {/* <BannerSection /> */}
      {/* <DescriptionCards /> */}
      {/* <SliderSection /> */}
      {/* <Winners /> */}
      {/* <FAQSection /> */}
    </>
  );
}
