"use client";

import {
  BannerSection,
  MainBannerLeft,
  MainBannerRight,
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

  return (
    <>
      <BannerSection
        background="brand"
        left={<MainBannerLeft data={activeParticipantCount} />}
        right={<MainBannerRight />}
      />
      {/* <SliderSection /> */}
      {/* <BannerSection /> */}
      {/* <SliderSection /> */}
      {/* <BannerSection /> */}
      {/* <DescriptionCards /> */}
      {/* <SliderSection /> */}
      {/* <Winners /> */}
      {/* <FAQSection /> */}
    </>
  );
}
