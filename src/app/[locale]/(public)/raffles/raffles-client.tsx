"use client";

import {
  Winner,
  SliderSection,
  BannerSection,
} from "@/features/raffles/raffle.types";
import { FAQ } from "@/types/types";

interface RafflesClientProps {
  data: {
    activeParticipantCount: number;
    winners: Winner[];
    faq: FAQ[];
    sliders: SliderSection[];
    banners: {
      featured: BannerSection;
      streamers: BannerSection[];
    };
  };
}

export default function RafflesClientPage({ data }: RafflesClientProps) {
  const { activeParticipantCount, winners, faq, sliders, banners } = data;
  const { featured, streamers } = banners;

  return (
    <>
      <BannerSection />
      <SliderSection />
      <BannerSection />
      <SliderSection />
      <BannerSection />
      <DescriptionCards />
      <SliderSection />
      <Winners />
      <FAQSection />
    </>
  );
}
